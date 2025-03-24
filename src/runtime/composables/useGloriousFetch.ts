import { useFetch, useRuntimeConfig } from 'nuxt/app'
import { GloriousStore } from '../stores/GloriousStore'
import type { gloriousFetchOptions } from './helper/useGloriousFetch/gloriousFetchOptionsInterface'
import defaultOptions from './helper/useGloriousFetch/gloriousFetchDefaultOptions'
import computeGKey from './helper/useGloriousFetch/functionComputeGKey'
import computeParams from './helper/useGloriousFetch/functionComputeParams'
import computeHeaderFetch from './helper/useGloriousFetch/functionComputeHeaderFetch'
import computeFormData from './helper/useGloriousFetch/functionComputeFormData'
import computeAuth from './helper/useGloriousFetch/functionComputeAuth'
import computeValidation from './helper/useGloriousFetch/functionComputeValidation'
import defu from 'defu'

export default async function (
  url: string,
  options: gloriousFetchOptions = defaultOptions
) {
  const moduleConfig: any = useRuntimeConfig()
  const gs: any = GloriousStore()
  const gKey: String = computeGKey(options.gKey, url)

  options = defu(moduleConfig.public.glorious.fetch, options, defaultOptions)
  options.params = computeParams(<Object>options.params)
  options.headers = {
    ...options.headers,
    ...computeAuth(moduleConfig),
    ...(await computeHeaderFetch({ ...options, url: url })),
  }

  if (options.bodyType === 'formData') options.body = computeFormData(options)

  const opt: gloriousFetchOptions | any = {
    ...options,
    onRequest() {
      try {
        gs.loading[<string>gKey] = true
      } catch (e) {
        /* empty */
      }
    },
    onResponse({ response }: any) {
      gs.response[<string>gKey] = response._data
      try {
        gs.loading[<string>gKey] = false
        gs.forms[<string>gKey].errors = []
      } catch (e) {
        /* empty */
      }
    },
    async onResponseError({ response: res }: any) {
      const fetch = import.meta.glob('/glorious/fetch.ts')
      if (typeof fetch['/glorious/fetch.ts'] !== 'undefined')
        fetch['/glorious/fetch.ts']().then((data: any) => {
          data.fetchHandler.onResponseError(res, gKey)
        })
      else {
        if (res.status === 422) {
          try {
            gs.forms[<string>gKey].errors = res._data.errors
          } catch (e) {
            /* empty */
          }
        }
        if (res.status === 401 && process.client) gs.authLogout()
      }
    },
  }

  if (opt.keepResponse && !gs.keepResponse.includes(gKey))
    gs.keepResponse.push(gKey)

  computeValidation(options.validationRequest, gKey, options.body)

  if (opt.method === 'GET' && typeof opt.body !== 'undefined') {
    opt.method = 'POST'
    return $fetch(url, opt)
  } else if (
    opt.method === 'GET' &&
    typeof opt.body === 'undefined' &&
    !opt.is$
  )
    return useFetch(url, opt)
  else return $fetch(url, opt)
}
