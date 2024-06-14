import { useCookie, useFetch, useRuntimeConfig } from "nuxt/app";
import { GloriousStore } from "../stores/GloriousStore";
export default function (url: string, options: any = {}) {
  if (!Object.prototype.hasOwnProperty.call(options, "server"))
    options.lazy = true;

  // compute params
  const computeParams: any = {};
  if (Object.prototype.hasOwnProperty.call(options, "params")) {
    Object.entries(options.params).map((item: any) => {
      if (item[1] !== null && item[1] !== "") computeParams[item[0]] = item[1];
    });

    options.params = computeParams;
  }

  const gs: any = GloriousStore();
  const moduleConfig: any = useRuntimeConfig();
  const gKey: any =
    typeof options.gKey !== "undefined"
      ? options.gKey
      : url.split("/")[url.split("/").length - 1];
  let header = {};

  if (gs.authIsLogin) {
    const token = useCookie(moduleConfig.public.glorious.auth.cookie.name);
    header = {
      Authorization: "Bearer " + token.value,
    };
  }

  if (
    Object.prototype.hasOwnProperty.call(options, "bodyType") &&
    options.bodyType === "formData"
  ) {
    const form: any = new FormData();

    Object.entries(options.body).forEach((item: any) => {
      form.append(item[0], item[1]);
    });

    options.body = form;
  }
  const opt = {
    baseURL: moduleConfig.public.glorious.fetch.baseUrl,
    headers: {
      Accept: "application/json",
      ...header,
    },
    ...options,
    onRequest() {
      try {
        gs.loading[gKey] = true;
        gs[gKey].loading = true;
      } catch (e) {
        /* empty */
      }
    },
    onResponse({ response: res }) {
      try {
        gs.loading[gKey] = false;
        gs[gKey].loading = false;
        gs[gKey].errors = [];
        if (
          res.status >= 200 &&
          res.status <= 299 &&
          Object.prototype.hasOwnProperty.call(options, "saveBody") &&
          !options.saveBody
        )
          gs[gKey].form = {};
      } catch (e) {
        /* empty */
      }
    },
    onResponseError({ response: res }) {
      if (res.status === 422) {
        try {
          gs[gKey].errors = res._data.errors;
        } catch (e) {
          /* empty */
        }
      }
      if (res.status === 401) gs.authLogout();
    },
  };
  if (
    Object.prototype.hasOwnProperty.call(options, "body") &&
    !Object.prototype.hasOwnProperty.call(options, "method")
  ) {
    opt["method"] = "POST";
    return $fetch(url, opt);
  }

  if (!Object.prototype.hasOwnProperty.call(options, "is$"))
    return $fetch(url, opt);

  if (Object.prototype.hasOwnProperty.call(options, "is$") && options.is$)
    return $fetch(url, opt);

  if (!Object.prototype.hasOwnProperty.call(opt, "server")) opt.server = false;

  console.log(url, "here");

  return useFetch(url, opt);
}
