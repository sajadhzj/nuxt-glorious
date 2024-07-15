import { defineNuxtPlugin, useHead } from "#imports";
import { useGloriousAppSetting } from "../composables/useGloriousAppSetting";

export default defineNuxtPlugin(() => {
  const gloriousAppSetting: any = useGloriousAppSetting.getSetting();

  useHead({
    htmlAttrs: {
      dir: gloriousAppSetting.dir,
      class: [gloriousAppSetting.darkMode ? "dark" : ""],
    },
  });
});
