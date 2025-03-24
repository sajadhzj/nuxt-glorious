import { useCookie } from 'nuxt/app'

export default (moduleConfig: any): Object => {
  type headerType = { Authorization?: String }
  const header: headerType = {}
  const token = useCookie(moduleConfig.public.glorious.auth.cookie.name)

  if (typeof token.value !== 'undefined')
    header.Authorization = 'Bearer ' + token.value

  return header
}
