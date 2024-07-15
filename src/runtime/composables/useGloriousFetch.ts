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

  const token = useCookie(moduleConfig.public.glorious.auth.cookie.name);
  if (typeof token.value !== "undefined")
    header = {
      Authorization: "Bearer " + token.value,
    };

  if (
    Object.prototype.hasOwnProperty.call(options, "bodyType") &&
    options.bodyType === "formData"
  ) {
    const form: any = new FormData();

    Object.entries(options.body).forEach((item: any) => {
      if (item[1] === null) return;

      if (
        Object.prototype.hasOwnProperty.call(options, "fileKey") &&
        options.fileKey.includes(item[0])
      )
        form.append(item[0], item[1]);
      else {
        if (typeof item[1] === "object")
          Object.entries(item[1]).forEach((nestedItem, index) => {
            form.append(`${item[0]}[${index}]`, nestedItem[1]);
          });
        else form.append(`${item[0]}`, item[1]);
      }
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
    credentials: "include",
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
    async onResponseError({ response: res }) {
      const fetch = import.meta.glob("/glorious/fetch.ts");
      if (typeof fetch["/glorious/fetch.ts"] !== "undefined")
        fetch["/glorious/fetch.ts"]().then((data: any) => {
          data.fetchHandler.onResponseError(res);
        });

      if (res.status === 422) {
        try {
          gs[gKey].errors = res._data.errors;
        } catch (e) {
          /* empty */
        }
      }
      if (res.status === 401 && process.client) {
        const cookieToken: any = useCookie(moduleConfig.auth.cookie.name);

        if (typeof cookieToken.value !== "undefined") gs.authLogout();
      }
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

  return useFetch(url, opt);
}
