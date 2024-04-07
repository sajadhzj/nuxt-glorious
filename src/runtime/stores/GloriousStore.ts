import {defineStore} from "pinia";
//@ts-ignore
import {useCookie, useRuntimeConfig} from "nuxt/app";

export const GloriousStore = defineStore("GloriousStore", {
    state: () => ({
      auth: {
        loaded: false,
        user: {}
      },
      loading:{},
      keepData:{}
    }),
    getters: {
      authIsLogin() {
        const moduleConfig: any = useRuntimeConfig()
        const cookie: any = useCookie(moduleConfig.public.glorious.auth.cookieName)

        return typeof cookie.value !== 'undefined';
      }
    },
    actions: {
      formCreate(key: string): void {
        this[key] = {
          form: {},
          errors: [],
          loading: false
        }
      },
      authLogout():void{
        const token: any = useCookie(moduleConfig.public.glorious.auth.cookieName)
        token.value = null
        this.auth.loaded = false

        navigateTo(moduleConfig.public.glorious.auth.redirect.logout)
      },
      authSetToken(token: string): void {
        const moduleConfig: any = useRuntimeConfig()
        const decodeToken = this.authParseToken(token)
        const cookie: any = useCookie(moduleConfig.public.glorious.auth.cookieName, {
          expires: new Date(Math.floor(decodeToken.exp * 1000))
        })
        cookie.value = token
      },
      authParseToken(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      },
    }
  }
)
