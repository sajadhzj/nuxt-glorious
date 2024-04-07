import {navigateTo, useRuntimeConfig} from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const gs = GloriousStore()
  const moduleConfig: any = useRuntimeConfig()
  if (!gs.authIsLogin())
    return navigateTo(moduleConfig.public.glorious.auth.redirect.logout)
})
