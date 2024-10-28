<script lang="ts" setup>
import { useGloriousAppSetting } from "../../composables/useGloriousAppSetting";

const props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  dir: {
    require: false,
    default: null,
    type: String as () => "rtl" | "ltr",
  },
});

const emits = defineEmits(["update:modelValue"]);

const addBlurBackground = (): void => {
  const backgroundBlur = document.createElement("div");
  backgroundBlur.classList.add("glorious-scaffold-drawer-bg-blur");
  const nuxt: any = document.getElementById("__nuxt");
  nuxt.appendChild(backgroundBlur);
  backgroundBlur.addEventListener("click", () => {
    console.log("here");

    emits("update:modelValue", false);
    backgroundBlur.remove();
  });
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      addBlurBackground();
    } else {
      const blur: any = document.querySelector(
        ".glorious-scaffold-drawer-bg-blur"
      );
      if (blur !== null) blur.remove();
    }
  }
);
</script>
<template>
  <div
    :class="[
      props.dir === null ? useGloriousAppSetting.getSetting().dir : props.dir,
      props.modelValue ? 'open' : 'close',
    ]"
    class="drawer close hidden"
  >
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/drawer.scss";
</style>
