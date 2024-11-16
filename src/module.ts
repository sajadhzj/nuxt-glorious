import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  createResolver,
  addImportsDir,
  installModule,
  addRouteMiddleware,
} from '@nuxt/kit'

import defu from 'defu'
// Module options TypeScript interface definition
export interface ModuleOptions {}

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
    nuxt.options.runtimeConfig.public.glorious = defu(nuxt.options.glorious, {
      fetch: {
        baseURL: '/',
        credentials: 'same-origin',
      },
      seo: {
        suffix: '',
        title: '',
        description: '',
      },
      auth: {
        cookie: {
          name: 'ga-token',
          httpOnly: false,
        },
        redirect: {
          logout: '/login',
          login: '/login',
        },
        strategy: {
          provider: '',
          //[laravel-passport]
          endpoints: {
            userInfo: {
              url: '/',
              method: 'GET',
              pick: '',
            },
          },
        },
      },
    })

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolver.resolve('./runtime/components/G/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    })
    await installModule('@pinia/nuxt')

    addImportsDir(resolver.resolve('runtime/composables'))
    addImportsDir(resolver.resolve('runtime/stores'))
    addImportsDir(resolver.resolve('runtime/middlewares'))
    addComponentsDir({
      path: resolver.resolve('runtime/components'),
      global: true,
      watch: false,
    })
    nuxt.hook('nitro:config', async (nitro: any) => {
      nitro.publicAssets.push({
        dir: resolver.resolve('./runtime/assets'),
      })
    })

    addPlugin(resolver.resolve('./runtime/plugins/glorious-app-setting'))
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
