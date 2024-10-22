<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: false,
    default: true,
    type: Boolean,
  },
  color: {
    required: false,
    default: "green",
    type: String as () => "orange" | "blue" | "gray" | "red" | "green",
  },
  size: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "xs",
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="glorious-checkbox" :class="[props.color, `size-${props.size}`]">
    <input
      type="checkbox"
      :disabled="props.disabled"
      @input="emits('update:modelValue', $event.currentTarget.checked)"
    />
    <div></div>
  </label>
</template>

<style lang="scss">
@import "../../assets/style/components/checkbox.scss";
</style>
