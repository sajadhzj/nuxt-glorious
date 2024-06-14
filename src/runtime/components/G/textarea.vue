<script setup lang="ts">
import { GloriousStore, ref, watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: String,
  },
  color: {
    required: false,
    default: "primary",
    type: String,
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
    type: String,
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

const gs: any = GloriousStore();
const error: any = props.error.split("|");
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div class="glorious-textarea">
      <textarea
        :autocomplete="props.autocomplete"
        :class="[props.size, `glorious-textarea-${props.color}`]"
        :placeholder="props.placeholder"
        v-model="inputValue"
        :disabled="props.disabled"
      />
    </div>
    <span class="glorious-error-text" v-if="gs[error[0]]?.errors[error[1]]">
      {{ gs[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>
