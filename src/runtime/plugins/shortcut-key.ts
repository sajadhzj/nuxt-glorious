import { defineNuxtPlugin } from "#app";
import { useGloriousAppSetting } from "../composables/useGloriousAppSetting";

export default defineNuxtPlugin(() => {
  window.addEventListener("keydown", (ev) => {
    const html = document.getElementsByTagName("html")[0];

    if (ev.key === "*") useGloriousAppSetting.setDarkMode();

    if (ev.key === "-")
      useGloriousAppSetting.setDir(html.dir === "rtl" ? "ltr" : "rtl");
  });
});
