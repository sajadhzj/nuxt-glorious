<script lang="ts" setup>
import type { colorType, sizeType } from '~/src/types/props'

interface inputPropInterface {
  color?: colorType
  size?: sizeType
  disabled?: boolean
  title?: string
  placeholder?: string
  error?: string
  type?: string
  iconColor?: string
}

const props: any = withDefaults(defineProps<inputPropInterface>(), {
  color: 'primary',
  size: 'md',
  disabled: false,
  title: '',
  placeholder: '',
  error: '|',
  type: 'password',
  iconColor: '#000',
})

const isPassword = ref(true)
</script>

<template>
  <GInput
    :icon="isPassword ? 'glorious-eye-fill' : 'glorious-eye-off-fill'"
    :type="isPassword ? 'text' : 'password'"
    @icon-clicked="isPassword = !isPassword"
    :color="props.color"
    :size="props.size"
    :disabled="props.disabled"
    :title="props.title"
    :placeholder="props.placeholder"
    :error="props.error"
    :icon-color="props.iconColor"
  />
</template>
