//@ts-ignore
import {defineNuxtModule, addPlugin, createResolver, addImportsDir, installModule} from '@nuxt/kit'
//@ts-ignore
import defu from "defu";

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'glorious',
    configKey: 'glorious'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options: any, nuxt: any) {
    // @ts-ignore
    const resolver = createResolver(import.meta.url)

    //config
    nuxt.options.runtimeConfig.public.glorious = defu(nuxt.options.glorious, {
      fetch: {
        baseUrl: '/'
      },
      auth: {
        cookieName: 'ga-token',
        redirect: {
          logout: '/login'
        }
      }
    })

    addImportsDir(resolver.resolve('runtime/composables'))
    addImportsDir(resolver.resolve('runtime/stores'))
    addImportsDir(resolver.resolve('runtime/middlewares'))
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    await installModule('@pinia/nuxt', {
      autoImports: ["defineStore", ["defineStore", "definePiniaStore"]]
    })
  }
})
