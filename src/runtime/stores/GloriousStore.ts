import { defineStore } from "pinia";
import { navigateTo, useCookie, useRuntimeConfig } from "nuxt/app";
export const GloriousStore = defineStore("GloriousStore", {
  state: (): any => ({
    auth: {
      loaded: false,
      user: {},
    },
    loading: {},
    keepData: {},
  }),
  getters: {
    authIsLogin() {
      const moduleConfig: any = useRuntimeConfig();
      const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name);
      return typeof cookie.value !== "undefined";
    },
  },
  actions: {
    formCreate(key: string) {
      this[key] = {
        form: {},
        errors: [],
        loading: false,
      };
    },
    authLogout() {
      const moduleConfig: any = useRuntimeConfig();
      const token = useCookie(moduleConfig.public.glorious.auth.cookie.name);
      token.value = null;
      this.auth.loaded = false;
      navigateTo(moduleConfig.public.glorious.auth.redirect.logout);
    },
    authSetToken(token: string, to: string | null = null) {
      const moduleConfig: any = useRuntimeConfig();
      const decodeToken = this.authParseToken(token);
      const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name, {
        expires: new Date(Math.floor(decodeToken.exp * 1e3)),
        httpOnly: moduleConfig.public.glorious.auth.cookie.httpOnly,
      });
      cookie.value = token;
      if (to) navigateTo(to);
    },
    authParseToken(token: any) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    },
  },
});
