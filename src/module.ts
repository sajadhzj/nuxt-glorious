import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  createResolver,
  addImportsDir,
  installModule,
  addRouteMiddleware,
  addVitePlugin,
} from '@nuxt/kit'

import defu from 'defu'
// Module options TypeScript interface definition
import defaultModuleOption from './config/defaultModuleOption'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-glorious',
    configKey: 'glorious',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options: any, nuxt: any) {
    const resolver = createResolver(import.meta.url)

    //config
    nuxt.options.runtimeConfig.public.glorious = defu(
      nuxt.options.glorious,
      defaultModuleOption
    )

    await installModule('@pinia/nuxt')
    await installModule('@nuxt/image')

    addImportsDir(resolver.resolve('runtime/composables'))
    addImportsDir(resolver.resolve('runtime/stores'))

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
      global: true,

      watch: false,
    })
    if (nuxt.options.builder === '@nuxt/vite-builder') {
      const plugin = await import('@tailwindcss/vite').then((r) => r.default)

      addVitePlugin(plugin())
    }

    nuxt.hook('nitro:config', async (nitro: any) => {
      nitro.publicAssets.push({
        dir: resolver.resolve('./runtime/assets'),
      })
    })

    addPlugin(resolver.resolve('./runtime/plugins/modalClose'))
    addPlugin(resolver.resolve('./runtime/plugins/InputComponent'))

    addRouteMiddleware({
      name: 'g-auth-strategy',
      path: resolver.resolve('./runtime/middlewares/AuthStrategy'),
      global: true,
    })
    addRouteMiddleware({
      name: 'response-glorious-store',
      path: resolver.resolve('./runtime/middlewares/ResponseGloriousStore'),
      global: true,
    })
    addRouteMiddleware({
      name: 'g-auth',
      path: resolver.resolve('./runtime/middlewares/Auth'),
    })
  },
})
