<script lang="ts" setup>
import { GloriousStore, ref, watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: [String, Number],
  },
  options: {
    required: true,
    default: [],
    type: Array<object>,
  },
  color: {
    required: false,
    default: "primary",
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String,
  },
  title: {
    required: false,
    default: "",
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
  placeholder: {
    required: false,
    default: "",
    type: String,
  },
});
const selectValue = ref(null);
const emits = defineEmits(["update:modelValue"]);
watch(
  () => selectValue.value,
  () => {
    emits("update:modelValue", selectValue.value);
  }
);

const gs: any = GloriousStore();
const error: any = props.error.split("|");

if (props.placeholder !== "") {
  props.options.unshift({
    text: props.placeholder,
    value: null,
  });
}

// -------------------------------------- init value
watch(
  () => props.modelValue,
  () => {
    selectValue.value = props.modelValue;
  }
);
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <select
      aria-label="glorious select"
      v-model="selectValue"
      :disabled="props.disabled"
      class="text-gray-500 text-[14px]"
      :class="[`glorious-select-${props.color}`, props.size]"
    >
      <option
        v-for="(item, index) in props.options"
        :key="index"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>
    <span
      class="text-[12px] text-red-500"
      v-if="gs[error[0]]?.errors[error[1]]"
      >{{ gs[error[0]].errors[error[1]][0] }}</span
    >
  </div>
</template>
