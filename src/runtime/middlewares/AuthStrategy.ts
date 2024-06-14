import {
  GloriousStore,
  defineNuxtRouteMiddleware,
  useCookie,
  useNuxtApp,
} from "#imports";

export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();
  const moduleConfig: any = nuxtApp.$config.public.glorious;
  const gs = GloriousStore();

  if (moduleConfig.auth.strategy.provider === "") return;

  const cookieToken: any = useCookie(moduleConfig.auth.cookie.name);

  if (typeof cookieToken.value === "undefined") return;

  nuxtApp.hook("app:beforeMount", () => gs.authGetUser(cookieToken.value));
});
