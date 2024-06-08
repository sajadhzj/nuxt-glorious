import { defineNuxtPlugin } from "#app";
import { addRouteMiddleware, navigateTo } from "nuxt/app";
import { GloriousStore } from "../stores/GloriousStore";

export default defineNuxtPlugin((nuxtApp: any) => {
  addRouteMiddleware("g-auth", () => {
    setTimeout(() => {
      const gs = GloriousStore();
      const moduleConfig: any = nuxtApp.$config.public.glorious;
      if (!gs.authIsLogin) return navigateTo(moduleConfig.auth.redirect.login);
    }, 500);
  });
});
