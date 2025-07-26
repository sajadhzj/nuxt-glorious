import { defineStore } from 'pinia'
import { navigateTo, useCookie, useRuntimeConfig, useFetch } from '#imports'
import tc from '../scripts/store/tc'
interface AuthState {
  loaded: boolean
  user: Record<string, any>
}

interface UIColors {
  dom: Record<string, string>
  tailwind: Record<string, string | Record<string, string>>
}

interface UIState {
  colors: UIColors
  isDark: boolean
}

interface FormsState {
  [key: string]: {
    form: Record<string, any>
    errors: any[]
  }
}

interface GloriousState {
  auth: AuthState
  loading: Record<string, any>
  keepData: Record<string, any>
  forms: FormsState
  response: Record<string, any>
  modals: Record<string, any>
  keepResponse: any[]
  ui: UIState
}

interface GloriousGetters {
  [key: string]: (...args: any[]) => any
  authIsLogin(): boolean
}

interface GloriousActions {
  tc(color: string): string | undefined
  formCreate(key: string | string[]): void
  authLogout(): void
  authSetToken(token: string, to?: string | null): void
  authParseToken(token: string): any
  authGetUser(token?: string): void
}

export const GloriousStore = defineStore<
  'GloriousStore',
  GloriousState,
  GloriousGetters,
  GloriousActions
>('GloriousStore', {
  state: (): GloriousState => ({
    auth: {
      loaded: false,
      user: {},
    },
    loading: {},
    keepData: {},
    forms: {},
    response: {},
    modals: {},
    keepResponse: [],
    ui: {
      colors: {
        dom: {},
        tailwind: {},
      },
      isDark: false,
    },
  }),
  getters: {
    authIsLogin() {
      const moduleConfig: any = useRuntimeConfig()
      const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name)

      return typeof cookie.value !== 'undefined'
    },
  },
  actions: {
    tc(color: string) {
      return tc(color, this)
    },
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
