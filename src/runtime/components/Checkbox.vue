<script lang="ts" setup>
import type { colorType, sizeType } from '~/src/types/props'

interface checkboxPropsInterface {
  color?: colorType
  size?: sizeType
  checked?: boolean
  label?: string
  disabled?: boolean
  name?: string
  ariaLabel?: string
}

const props: any = withDefaults(defineProps<checkboxPropsInterface>(), {
  color: 'primary',
  size: 'md',
  checked: false,
  name: 'checkbox',
})

const model = defineModel()
</script>

<template>
  <label
    class="glorious-checkbox"
    :class="[
      `color-${props.color}`,
      `size-${props.size}`,
      props.disabled ? 'disabled' : '',
    ]"
  >
    <span>{{ props.label }}</span>
    <label :class="[`color-${props.color}`, `size-${props.size}`]">
      <input
        type="checkbox"
        :checked="props.checked"
        :disabled="props.disabled"
        v-model="model"
        :aria-label="props.ariaLabel"
        :name="props.name"
      />
      <div></div>
    </label>
  </label>
</template>
