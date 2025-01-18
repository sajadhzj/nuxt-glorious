<script setup lang="ts">
import { ref, watch } from '#imports'
import _props from '../props/Textarea'
import { hasValidationError } from '../helper'
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
      {{ props.title }}
      <span
        v-if="props.required"
        class="text-red-500"
      >
        *
      </span>
    </span>
    <div class="glorious-textarea">
      <textarea
        v-model="inputValue"
        :class="[
          `glorious-textarea-${props.color}`,
          hasValidationError(props.error) ? 'validation-error' : '',
        ]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :rows="props.rows"
      />
      <GErrorText :error="props.error" />
    </div>
  </div>
</template>

<style lang="scss" src="../../style/components/textarea.scss" />
