<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: false,
    default: true,
    type: [Boolean, String, Object],
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
  name: {
    required: true,
    type: String,
  },
  value: {
    required: false,
    default: "",
    type: String,
  },
  checked: {
    required: false,
    type: Boolean,
  },
});

const emits = defineEmits(["update:modelValue"]);

const inputFunction = (event: any) =>
  emits("update:modelValue", event.currentTarget.checked);
</script>

<template>
  <label class="glorious-radio" :class="[props.color, `size-${props.size}`]">
    <input
      :name="props.name"
      type="radio"
      :disabled="props.disabled"
      :value="props.value"
      :checked="props.checked"
      @input="inputFunction($event)"
    />
    <div></div>
  </label>
</template>

<style lang="scss">
@import "../../assets/style/components/radio.scss";
</style>
