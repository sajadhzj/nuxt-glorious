// @ts-ignore
import { defineNuxtPlugin } from "#app";
// @ts-ignore
import { addRouteMiddleware } from "nuxt/app";
import useGloriousFetch from "../composables/useGloriousFetch";
import { GloriousStore } from "../stores/GloriousStore";

export default defineNuxtPlugin((nuxtApp: any) => {
  addRouteMiddleware(
    "g-auth-strategy",
    () => {
      const moduleConfig: any = nuxtApp.$config.public.glorious;

      nuxtApp.hook("page:finish", () => {
        // @ts-ignore
        const gs = GloriousStore();

        if (moduleConfig.auth.strategy.provider === "") return;

        if (gs.auth.loaded || !gs.authIsLogin) return;

        useGloriousFetch(moduleConfig.auth.strategy.endpoints.userInfo.url, {
          method: moduleConfig.auth.strategy.endpoints.userInfo.method,
        }).then((data: any) => {
          const pick = moduleConfig.auth.strategy.endpoints.userInfo.pick;

          if (pick !== "") gs.auth.user = data[pick];
          else gs.auth.user = data;

          gs.auth.loaded = true;
        });
      });
    },
    {
      global: true,
    }
  );
});
