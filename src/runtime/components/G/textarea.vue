<script setup lang="ts">
import { ref, watch } from '#imports'
import _props from '../props/Textarea'
import { hasValidationError, getAttribute } from '../helper'

const props = defineProps(_props)
const modelValue = defineModel()

const inputValue: any = ref(null)
if (modelValue.value !== '') inputValue.value = modelValue.value
watch(
  () => inputValue.value,
  () => (modelValue.value = inputValue.value)
)
watch(
  () => modelValue.value,
  () => (inputValue.value = modelValue.value)
)
</script>

<template>
  <div class="flex flex-col">
    <span class="glorious-title text-sm font-medium text-gray-500">
      {{ getAttribute(props.title, 'textarea', 'title') }}
      <span
        v-if="getAttribute(props.required, 'textarea', 'required')"
        class="text-red-500"
      >
        *
      </span>
    </span>
    <div class="glorious-textarea">
      <textarea
        v-model="inputValue"
        :class="[
          `glorious-textarea-${getAttribute(props.color, 'textarea', 'color')}`,
          hasValidationError(props.error) ? 'validation-error' : '',
        ]"
        :placeholder="
          getAttribute(props.placeholder, 'textarea', 'placeholder')
        "
        :disabled="getAttribute(props.disabled, 'textarea', 'disabled')"
        :rows="getAttribute(props.rows, 'textarea', 'rows')"
      />
      <GErrorText :error="props.error" />
    </div>
  </div>
</template>
