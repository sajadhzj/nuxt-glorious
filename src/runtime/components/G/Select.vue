<script lang="ts" setup>
import { ref, watch } from '#imports'
import _props from '../props/Select'

const props: any = defineProps(_props)
const modelValue = defineModel()
const selectValue: any = ref(null)
watch(
  () => selectValue.value,
  () => {
    modelValue.value = selectValue.value
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

modelValue.value = null
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

<style lang="scss" src="../../style/components/select.scss" />
