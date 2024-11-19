<script lang="ts" setup>
import { ref, watch } from '#imports'
interface selectOptionsInterface {
  text: string
  value: [string, object]
}
const props: any = defineProps({
  modelValue: {
    required: false,
    default: null,
    type: [String, Number],
  },
  options: {
    required: true,
    default: [],
    type: Array<selectOptionsInterface>,
  },
  color: {
    required: false,
    default: 'primary',
    type: String,
  },
  size: {
    required: false,
    default: 'md',
    type: String,
  },
  title: {
    required: false,
    default: '',
    type: String,
  },
  error: {
    required: false,
    default: '|',
    type: String,
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
  placeholder: {
    required: false,
    default: '',
    type: String,
  },
  displayTextKey: {
    required: false,
    default: 'text',
    type: String,
  },
})
const selectValue: any = ref(null)
const emits = defineEmits(['update:modelValue'])
watch(
  () => selectValue.value,
  () => {
    emits('update:modelValue', selectValue.value)
  }
)

// -------------------------------------- init value
selectValue.value = props.modelValue
watch(
  () => props.modelValue,
  () => {
    selectValue.value = props.modelValue
  }
)

emits('update:modelValue', null)
selectValue.value = null
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div class="grow flex relative">
      <select
        v-model="selectValue"
        aria-label="glorious select"
        :disabled="props.disabled"
        class="grow"
        :class="[`glorious-select-${props.color}`, props.size]"
      >
        <option
          v-for="(item, index) in props.options"
          :key="index"
          :value="item.value"
        >
          {{ item[props.displayTextKey] }}
        </option>
      </select>
      <span
        v-if="selectValue === null"
        class="absolute top-0 bottom-0 my-auto pr-2 h-max text-gray-500"
      >
        {{ props.placeholder }}
      </span>
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss">
@import '../../assets/style/components/select.scss';
</style>
