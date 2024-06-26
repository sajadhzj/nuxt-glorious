import {
  defineNuxtRouteMiddleware,
  navigateTo,
  useCookie,
  useRuntimeConfig,
} from "#imports";

export default defineNuxtRouteMiddleware(() => {
  const moduleConfig: any = useRuntimeConfig();
  const authCookie = useCookie(moduleConfig.public.glorious.auth.cookie.name);

  if (typeof authCookie.value === "undefined")
    return navigateTo(moduleConfig.public.glorious.auth.redirect.login);
});
