import { useCookie, useFetch, useNuxtApp, useRuntimeConfig } from "nuxt/app";
import { GloriousStore } from "../stores/GloriousStore";
import defu from "defu";
interface gloriousFetchOptions {
  gKey?: String;
  params?: Object;
  server?: Boolean;
  is$?: Boolean;
  lazy?: Boolean;
  headers?: Object;
  body?: Object;
  bodyType?: "formData" | "formDataCustom" | "normal";
  method?: "POST" | "GET" | "PATCH" | "PUT" | "DELETE" | "HEAD";
  credentials?: "same-origin" | "include";
  watch?: Array<Object>;
}
const defaultOptions: gloriousFetchOptions = {
  server: false,
  method: "GET",
  lazy: true,
  is$: true,
  params: {},
  headers: {
    Accept: "application/json",
  },
  bodyType: "normal",
  body: {},
  credentials: "same-origin",
};

export default function (url: string, options: gloriousFetchOptions) {
  const moduleConfig: any = useRuntimeConfig();
  options = defu(moduleConfig.public.glorious.fetch, options, defaultOptions);

  const gs: any = GloriousStore();
  const gKey: String = computeGKey(options.gKey, url);

  options.params = computeParams(<Object>options.params);
  options.headers = { ...options.headers, ...computeAuth() };

  if (options.bodyType === "formData") options.body = computeFormData(options);

  if (
    options.bodyType === "normal" &&
    Object.entries(<Object>options.body).length === 0
  )
    delete options.body;

  const opt: gloriousFetchOptions | any = {
    ...options,
    onRequest() {
      try {
        gs.loading[<string>gKey] = true;
      } catch (e) {
        /* empty */
      }
    },
    onResponse({ response: res }) {
      try {
        gs.loading[<string>gKey] = false;
        gs.forms[<string>gKey].errors = [];
        if (
          res.status >= 200 &&
          res.status <= 299 &&
          Object.prototype.hasOwnProperty.call(options, "saveBody") &&
          !options.saveBody
        )
          gs.forms[<string>gKey].form = {};
      } catch (e) {
        /* empty */
      }
    },
    async onResponseError({ response: res }) {
      const fetch = import.meta.glob("/glorious/fetch.ts");
      if (typeof fetch["/glorious/fetch.ts"] !== "undefined")
        fetch["/glorious/fetch.ts"]().then((data: any) => {
          data.fetchHandler.onResponseError(res, gKey);
        });
      else {
        if (res.status === 422) {
          try {
            gs.forms[<string>gKey].errors = res._data.errors;
          } catch (e) {
            /* empty */
          }
        }
        if (res.status === 401 && process.client) gs.authLogout();
      }
    },
  };

  if (opt.method === "GET" && typeof opt.body !== "undefined") {
    opt.method = "POST";
    return $fetch(url, opt);
  } else if (
    opt.method === "GET" &&
    typeof opt.body === "undefined" &&
    !opt.is$
  )
    return useFetch(url, opt);
  else return $fetch(url, opt);
}

function computeParams(params: Object): Object {
  const computeParams: any = {};
  Object.entries(params).map((item: any) => {
    if (item[1] !== null && item[1] !== "") computeParams[item[0]] = item[1];
  });

  return computeParams;
}

function computeGKey(gKey: String | undefined, url: string) {
  return typeof gKey !== "undefined"
    ? gKey
    : url.split("/")[url.split("/").length - 1];
}

function computeAuth(): Object {
  const moduleConfig: any = useRuntimeConfig();

  type headerType = { Authorization?: String };
  const header: headerType = {};
  const token = useCookie(moduleConfig.public.glorious.auth.cookie.name);

  if (typeof token.value !== "undefined")
    header.Authorization = "Bearer " + token.value;

  return header;
}

function computeFormData(options: gloriousFetchOptions) {
  console.log(options.body);

  const form: any = new FormData();

  Object.entries(<Object>options.body).forEach((item: any) => {
    if (item[1] === null) return;

    if (
      typeof item[1] === "object" &&
      typeof item[1].lastModifiedDate === "undefined"
    )
      Object.entries(item[1]).forEach((nestedItem, index) => {
        form.append(`${item[0]}[${index}]`, nestedItem[1]);
      });
    else {
      form.append(`${item[0]}`, item[1]);
    }
  });

  return form;
}
