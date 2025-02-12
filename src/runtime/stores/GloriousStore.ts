import { defineStore } from 'pinia'
import { navigateTo, useCookie, useRuntimeConfig, useFetch } from '#imports'
export const GloriousStore = defineStore('GloriousStore', {
  state: (): any => ({
    auth: {
      loaded: false,
      user: {},
    },
    loading: {},
    keepData: {},
    forms: {},
    response: {},
    keepResponse: [],
  }),
  getters: {
    authIsLogin() {
      const moduleConfig: any = useRuntimeConfig()
      const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name)

      return typeof cookie.value !== 'undefined'
    },
  },
  actions: {
    formCreate(key: string | Array<string>) {
      this.forms = {}
      if (typeof key === 'string')
        this.forms[<string>key] = {
          form: {},
          errors: [],
        }
      else
        key.map((item) => {
          this.forms[item] = {
            form: {},
            errors: [],
          }
        })
    },
    authLogout() {
      const moduleConfig: any = useRuntimeConfig()
      const token = useCookie(moduleConfig.public.glorious.auth.cookie.name)
      token.value = null
      this.auth.loaded = false

      navigateTo(moduleConfig.public.glorious.auth.redirect.logout)
    },
    authSetToken(token: string, to: string | null = null) {
      const moduleConfig: any = useRuntimeConfig()
      const decodeToken = this.authParseToken(token)
      const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name, {
        expires: new Date(Math.floor(decodeToken.exp * 1e3)),
        httpOnly: moduleConfig.public.glorious.auth.cookie.httpOnly,
      })
      cookie.value = token

      this.authGetUser(token)
      if (to) navigateTo(to)
    },
    authParseToken(token: any) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      return JSON.parse(jsonPayload)
    },
    authGetUser(token: string = '') {
      const moduleConfig: any = useRuntimeConfig()

      useFetch(
        moduleConfig.public.glorious.auth.strategy.endpoints.userInfo.url,
        {
          lazy: false,
          baseURL: moduleConfig.public.glorious.fetch.baseURL,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
          method:
            moduleConfig.public.glorious.auth.strategy.endpoints.userInfo
              .method,
        }
      ).then((data: any) => {
        if (data.status.value === 'error') {
          const moduleConfig: any = useRuntimeConfig()
          const token = useCookie(moduleConfig.public.glorious.auth.cookie.name)
          token.value = null
          this.auth.loaded = false
        }

        const pick =
          moduleConfig.public.glorious.auth.strategy.endpoints.userInfo.pick
        if (pick !== '') this.auth.user = data.data.value[pick]
        else this.auth.user = data.data.value

        this.auth.loaded = true
      })
    },
  },
})
