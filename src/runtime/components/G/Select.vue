<script lang="ts" setup>
import { GloriousStore, ref, watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: null,
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

// -------------------------------------- init value
selectValue.value = props.modelValue;
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
      v-model="selectValue"
      aria-label="glorious select"
      :disabled="props.disabled"
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
      v-if="gs.forms[error[0]]?.errors[error[1]]"
      class="text-red-500 text-[14px]"
    >
      {{ gs.forms[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/select.scss";
</style>
