import {useCookie, useFetch, useRuntimeConfig} from "nuxt/app";
import {GloriousStore} from "../stores/GloriousStore";

export default function (url: string, options: any = {}) {
  const gs = GloriousStore()
  const moduleConfig: any = useRuntimeConfig()

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
    ...options
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
