import {defineNuxtPlugin} from '#app'
import {addRouteMiddleware, navigateTo} from "nuxt/app";

export default defineNuxtPlugin((nuxtApp:any) => {
  addRouteMiddleware('g-auth', () => {
    nuxtApp.hook('page:finish', () => {
      const gs = nuxtApp.$pinia._s.get('GloriousStore')
      const moduleConfig: any = nuxtApp.$config.public.glorious
      if (!gs.authIsLogin)
        navigateTo(moduleConfig.auth.redirect.login)
    })
  })
})
