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
const firstVal = selectValue.value
</script>

<template>
  <div class="flex flex-col">
    <span class="glorious-title text-sm font-medium text-gray-500">
      {{ props.title }}
      <span
        v-if="props.required"
        class="text-red-500"
      >
        *
      </span>
    </span>
    <div class="grow flex relative">
      {{ selectValue }}
      <select
        v-model="selectValue"
        aria-label="glorious select"
        :disabled="props.disabled"
        class="grow glorious-select"
        :class="[`color-${props.color}`, props.size]"
      >
        <option
          :selected="
            selectValue === null ||
            selectValue === '' ||
            typeof selectValue === 'undefined'
          "
          :value="firstVal"
        >
          {{ props.placeholder }}
        </option>
        <option
          v-for="(item, index) in props.options"
          :key="index"
          :value="item.value"
        >
          {{ item[props.displayTextKey] }}
        </option>
      </select>
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss" src="../../style/components/select.scss" />
