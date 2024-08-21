<script setup lang="ts">
import { ref, watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: String,
  },
  color: {
    required: false,
    default: "primary",
    type: String as () => "orange" | "blue" | "gray" | "red" | "primary",
  },
  placeholder: {
    required: false,
    default: "",
    type: String,
  },
  title: {
    required: false,
    default: "",
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "xsm",
  },
  error: {
    required: false,
    default: "|",
    type: String,
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
  autocomplete: {
    required: false,
    default: "off",
    type: String,
  },
});

const inputValue: any = ref(null);
if (props.modelValue !== "") inputValue.value = props.modelValue;
const emits = defineEmits(["update:modelValue"]);
watch(
  () => inputValue.value,
  () => emits("update:modelValue", inputValue.value)
);
watch(
  () => props.modelValue,
  () => (inputValue.value = props.modelValue)
);
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div class="glorious-textarea">
      <textarea
        v-model="inputValue"
        :autocomplete="props.autocomplete"
        :class="[props.size, `glorious-textarea-${props.color}`]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/textarea.scss";
</style>
