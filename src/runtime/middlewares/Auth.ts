import {
  callWithNuxt,
  useNuxtApp,
  useRequestHeaders,
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  useCookie,
  navigateTo,
} from "#app";

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  const moduleConfig: any = useRuntimeConfig();

  if (process.server) {
    const { cookie } = await callWithNuxt(nuxtApp, () =>
      useRequestHeaders(["cookie"])
    );
    if (typeof cookie !== "undefined") {
      const cookieSplit = cookie?.split(`;`);
      const findAuthCookie = cookieSplit.find((item: any) =>
        item.includes(moduleConfig.public.glorious.auth.cookie.name)
      );

      if (typeof findAuthCookie === "undefined") {
        return navigateTo(moduleConfig.public.glorious.auth.redirect.login, {
          redirectCode: 302,
        });
      }
    }
  }

  if (process.client) {
    const cookie = useCookie(moduleConfig.public.glorious.auth.cookie.name);

    if (typeof cookie.value === "undefined")
      return navigateTo(moduleConfig.public.glorious.auth.redirect.login, {
        redirectCode: 302,
      });
  }
});
