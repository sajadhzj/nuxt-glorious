//@ts-ignore
import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  createResolver,
  addImportsDir,
  installModule,
} from "@nuxt/kit";
//@ts-ignore
import defu from "defu";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "glorious",
    configKey: "glorious",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options: any, nuxt: any) {
    // @ts-ignore
    const resolver = createResolver(import.meta.url);

    //config
    nuxt.options.runtimeConfig.public.glorious = defu(nuxt.options.glorious, {
      fetch: {
        baseUrl: "/",
      },
      seo: {
        suffix: "",
        title: "",
        description: "",
      },
      auth: {
        cookie: {
          name: "ga-token",
          httpOnly: false,
        },
        redirect: {
          logout: "/login",
          login: "/login",
        },
        strategy: {
          provider: "",
          //[laravel-passport]
          endpoints: {
            userInfo: {
              url: "/",
              method: "GET",
              pick: "",
            },
          },
        },
      },
    });

    addImportsDir(resolver.resolve("runtime/composables"));
    addImportsDir(resolver.resolve("runtime/stores"));
    addImportsDir(resolver.resolve("runtime/middlewares"));
    addComponentsDir({
      path: resolver.resolve("runtime/components"),
    });
    nuxt.hook("nitro:config", async (nitro: any) => {
      nitro.publicAssets.push({
        dir: resolver.resolve("./runtime/assets"),
      });
    });
    addPlugin(resolver.resolve("./runtime/middlewares/Auth"));
    addPlugin(resolver.resolve("./runtime/middlewares/AuthStrategy"));
    await installModule("@nuxtjs/tailwindcss");
    await installModule("@pinia/nuxt", {
      autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
    });
  },
});
