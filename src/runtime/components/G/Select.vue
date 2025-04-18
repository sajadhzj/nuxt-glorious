<script lang="ts" setup>
import { ref, watch } from '#imports'
import _props from '../props/Select'
import { hasValidationError, getAttribute } from '../helper'

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
        v-if="getAttribute(props.required, 'select', 'required')"
        class="text-red-500"
      >
        *
      </span>
    </span>
    <div class="grow flex relative">
      <select
        v-model="selectValue"
        aria-label="glorious select"
        :disabled="getAttribute(props.disabled, 'select', 'disabled')"
        class="grow glorious-select"
        :class="[
          `color-${getAttribute(props.color, 'select', 'color')}`,
          getAttribute(props.size, 'select', 'size'),
          hasValidationError(props.error) ? 'validation-error' : '',
          selectValue === null || selectValue === ''
            ? 'text-gray-500'
            : 'text-black',
        ]"
      >
        <option
          :selected="
            selectValue === null ||
            selectValue === '' ||
            typeof selectValue === 'undefined'
          "
          :value="firstVal"
        >
          {{
            props.firstOptionText === ''
              ? props.placeholder
              : props.firstOptionText
          }}
        </option>
        <option
          v-for="(item, index) in props.options"
          :key="index"
          :value="item[getAttribute(props.keyOfValue, 'select', 'keyOfValue')]"
        >
          {{
            item[getAttribute(props.displayTextKey, 'select', 'displayTextKey')]
          }}
        </option>
      </select>
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>
