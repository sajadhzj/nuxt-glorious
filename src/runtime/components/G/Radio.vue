<script lang="ts" setup>
const props = defineProps({
  name: {
    required: false,
    default: "radio",
    type: String,
  },
  value: {
    required: false,
    default: "radio",
    type: [String, Number, null],
  },
  modelValue: {
    required: false,
    default: "",
    type: [String, Number, null],
  },
  checked: {
    required: false,
    default: false,
    type: Boolean,
  },
});

const emits: any = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <input
      type="radio"
      :name="props.name"
      :value="props.value"
      @click="emits('update:modelValue', props.value)"
      :checked="props.checked"
    />
  </div>
</template>
