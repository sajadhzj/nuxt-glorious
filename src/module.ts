import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  createResolver,
  addImportsDir,
  installModule,
  addRouteMiddleware,
} from "@nuxt/kit";

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
    await installModule("@nuxtjs/tailwindcss");
    await installModule("@pinia/nuxt", {
      autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
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

    nuxt.options.css.push(
      resolver.resolve("./runtime/assets/style", "style.css")
    );
    // addPlugin({
    //   src: resolver.resolve("./runtime/plugins/TailwindColor"),
    //   mode: "server",
    // });
    addPlugin(resolver.resolve("./runtime/plugins/Modal"));
    addPlugin(resolver.resolve("./runtime/plugins/Drawer"));

    addRouteMiddleware({
      name: "g-auth-strategy",
      path: resolver.resolve("./runtime/middlewares/AuthStrategy"),
      global: true,
    });
    addRouteMiddleware({
      name: "g-auth",
      path: resolver.resolve("./runtime/middlewares/Auth"),
    });
  },
});
