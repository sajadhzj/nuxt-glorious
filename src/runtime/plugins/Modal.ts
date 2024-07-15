import { defineNuxtPlugin } from "#app";
import { GloriousStore } from "../stores/GloriousStore";

export default defineNuxtPlugin(() => {
  const methods = {
    addBlurBackground: (key: string): void => {
      const backgroundBlur = document.createElement("div");
      backgroundBlur.classList.add("bg-blur-modal");
      const nuxt: any = document.getElementById("__nuxt");
      nuxt.appendChild(backgroundBlur);
      backgroundBlur.addEventListener("click", () => {
        const componentId: any = document.getElementById(key);
        componentId.classList.replace("open", "close");
        backgroundBlur.remove();
      });
    },
    modal: {
      provide: (key: any, keepData: any = {}) => {
        const modal: any = document.getElementById(key);
        const gloriousStore = GloriousStore();
        gloriousStore.keepData = keepData;
        if (modal?.classList.contains("close")) {
          modal?.classList.replace("close", "open");
          modal.style.bottom = `-${modal.offsetHeight}px`;
          methods.addBlurBackground(key);
        } else {
          modal?.classList.add("close");
          const bgBlur: any = document.querySelector(".bg-blur-modal");
          bgBlur?.remove();
        }
      },
    },
  };

  return {
    provide: {
      modal: (key: string = "modal", keepData: any = {}): void =>
        methods.modal.provide(key, keepData),
    },
  };
});
