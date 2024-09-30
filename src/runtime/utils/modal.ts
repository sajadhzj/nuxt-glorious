import { GloriousStore } from "#imports";

export default function modal(key = "modal", keepData = {}) {
  const addBlurBackground = (key: string): void => {
    const backgroundBlur = document.createElement("div");
    backgroundBlur.classList.add("bg-blur-modal");
    const nuxt: any = document.getElementById("__nuxt");
    nuxt.appendChild(backgroundBlur);
    backgroundBlur.addEventListener("click", () => {
      const componentId: any = document.getElementById(key);
      componentId.classList.replace("open", "close");
      backgroundBlur.remove();
    });
  }

  const modal: any = document.getElementById(key);
  const gloriousStore = GloriousStore();
  gloriousStore.keepData = keepData;
  if (modal?.classList.contains("close")) {
    modal?.classList.replace("close", "open");
    modal.style.bottom = `-${modal.offsetHeight}px`;
    addBlurBackground(key);
  } else {
    modal?.classList.add("close");
    const bgBlur: any = document.querySelector(".bg-blur-modal");
    bgBlur?.remove();
  }
}
