import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const methods = {
    addBlurBackground: (key: string): void => {
      const backgroundBlur = document.createElement("div");
      backgroundBlur.classList.add("bg-blur");
      const nuxt: any = document.getElementById("__nuxt");
      nuxt.appendChild(backgroundBlur);
      backgroundBlur.addEventListener("click", () => {
        const componentId: any = document.getElementById(key);
        componentId.classList.replace("open", "close");
        backgroundBlur.remove();
      });
    },
    drawer: {
      provide: (key: any) => {
        let drawer: any = document.getElementById(key);
        if (drawer.classList.contains("close")) {
          drawer.classList.remove("hidden");
          drawer.classList.replace("close", "open");
          methods.addBlurBackground(key);
        } else {
          drawer.classList.replace("open", "close");
          const bgBlur: any = document.querySelector(".bg-blur");
          bgBlur?.remove();
        }
      },
    },
  };

  return {
    provide: {
      drawer: (key: string = "drawer"): void => methods.drawer.provide(key),
    },
  };
});
