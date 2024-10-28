<script lang="ts" setup>
import { watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  size: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "full",
  },
  title: {
    required: false,
    default: "",
    type: String,
  },
  okBtn: {
    required: false,
    default: "",
    type: String,
  },
  okBtnLoading: {
    required: false,
    default: false,
    type: Boolean,
  },
  closeBtn: {
    required: false,
    default: "",
    type: String,
  },
  rtl: {
    required: false,
    default: "rtl",
    type: String as () => "rtl" | "ltr",
  },
  blur: {
    required: false,
    default: true,
    type: Boolean,
  },
  blurClose: {
    required: false,
    default: true,
    type: Boolean,
  },
});

const emits = defineEmits(["ok", "close", "update:modelValue"]);

const addBlurBackground = (): void => {
  const backgroundBlur = document.createElement("div");
  backgroundBlur.classList.add("g-scafold-modal-bg-blur");
  const nuxt: any = document.getElementById("__nuxt");
  nuxt.appendChild(backgroundBlur);
  backgroundBlur.addEventListener("click", () => {
    if (props.blurClose) {
      emits("update:modelValue", false);
      backgroundBlur.remove();
    }
  });
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue && props.blur) {
      addBlurBackground();
    } else {
      const blur: any = document.querySelector(".g-scafold-modal-bg-blur");
      if (blur !== null) blur.remove();
    }
  }
);
</script>

<template>
  <div
    class="g-scafold-modal"
    :class="[props.modelValue ? 'open' : 'close', `size-${props.size}`]"
  >
    <!-- header -->
    <div v-show="props?.title !== ''" class="g-scafold-modal-header">
      <span class="font-medium">{{ props.title }}</span>
      <GButton
        class="flex justify-center items-center w-6 h-6"
        size="sm"
        color="red"
        @click="emits('update:modelValue', false)"
      >
        <GIcon name="glorious-x" color="#fff" :size="10" />
      </GButton>
    </div>
    <hr v-show="props.title !== ''" class="my-3" />
    <!-- end hader -->

    <div class="g-scafold-modal-header">
      <slot />
    </div>

    <!-- start footer -->
    <div v-show="props.okBtn !== ''" class="g-scafold-modal-footer">
      <GButton :loading="props.okBtnLoading" @click="emits('ok')">
        {{ props.okBtn }}
      </GButton>
      <GButton
        v-show="props.closeBtn !== ''"
        @click="emits('update:modelValue', false)"
      >
        {{ props.closeBtn }}
      </GButton>
    </div>
    <!-- end footer -->
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/modal.scss";
</style>
