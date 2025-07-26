<script setup lang="ts">
import type { colorType, sizeType } from '~/src/types/props'

interface propsInterface {
  name?: string
  value?: string | number
  size?: sizeType
  color?: colorType
  disable?: boolean
}

const props = withDefaults(defineProps<propsInterface>(), {
  name: 'glorious-radio',
  value: '',
  size: 'md',
  color: 'primary',
})

const modelValue = defineModel()
</script>

<template>
  <label :class="['glorious-radio-button', `size-${props.size}`]">
    <input
      type="radio"
      :name="props.name"
      :value="props.value"
      v-model="modelValue"
      class="radio-input"
      :disabled="props.disable"
    />
    <span
      class="radio-select"
      :class="[`color-${props.color}`]"
    ></span>
  </label>
</template>
