<script setup lang="ts">
import { ref, watch } from '#imports'
import _props from '../props/Textarea'
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
    <span class="glorious-title text-sm font-medium text-gray-500">{{
      props.title
    }}</span>
    <div class="glorious-textarea">
      <textarea
        v-model="inputValue"
        :class="[`glorious-textarea-${props.color}`]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :rows="props.rows"
      />
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss" src="../../style/components/textarea.scss" />
