//@ts-ignore
import {navigateTo, useCookie, useFetch, useRuntimeConfig} from "nuxt/app";
import {GloriousStore} from "../stores/GloriousStore";

export default function (url: string, options: any = {}) {
  const gs = GloriousStore()
  const moduleConfig: any = useRuntimeConfig()
  const gKey: string = typeof options.gKey !== "undefined"
    ? options.gKey
    : url.split('/')[url.split('/').length - 1]

  let header:any = {}
  if (gs.authIsLogin){
    const token:any = useCookie(moduleConfig.public.glorious.auth.cookieName)
    header = {
      'Authorization':'Bearer ' + token.value
    }
  }
  const opt: any = {
    baseURL:moduleConfig.public.glorious.fetch.baseUrl,
    headers:{
      Accept: 'application/json',
      ...header
    },
    ...options,
    onRequest() {
      try {
        gs.loading[gKey] = true
        gs[gKey].loading = true
      }catch (e){ /* empty */ }
    },
    onResponse() {
      try {
        gs.loading[gKey] = false
        gs[gKey].loading = false
        gs[gKey].errors = []
      }catch (e:any){ /* empty */ }
    },
    onResponseError({response: res}: any) {
      if (res.status === 422) {
        try {
          gs[gKey].errors = res._data.errors
        } catch (e) { /* empty */ }
      }

      if (res.status === 401)
        gs.authLogout()
    }
  }
  if (Object.prototype.hasOwnProperty.call(options, 'is$')
    && options.is$
    || (Object.prototype.hasOwnProperty.call(options, 'method')
      && options.method === 'POST')
  )
    return $fetch(url, opt)
  else
    return useFetch(url, opt)
}
