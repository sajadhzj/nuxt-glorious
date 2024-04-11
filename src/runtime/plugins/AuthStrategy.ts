// @ts-ignore
import {defineNuxtPlugin} from '#app'
// @ts-ignore
import {addRouteMiddleware, useRuntimeConfig} from "nuxt/app";

export default defineNuxtPlugin(() => {
  addRouteMiddleware('g-init-user', () => {
    const {hook}: any = useNuxtApp()
    const moduleConfig: any = useRuntimeConfig()

    hook('page:finish', () => {
      if (moduleConfig.public.glorious.auth.strategies.provider === '')
        return

      console.log('here')
    })
  })
})
