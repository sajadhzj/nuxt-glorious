<script lang="ts" setup>
import type { colorType, sizeType } from '~/src/types/props'

interface buttonPropInterface {
  color?: colorType
  size?: sizeType
  disabled?: boolean
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outline?: boolean
  loading?: boolean
  ariaLabel?: string
  to?: string
  label?: string
  icon?: string
  iconColor?: string
  iconPos?: 'right' | 'left'
}

const props: any = withDefaults(defineProps<buttonPropInterface>(), {
  color: 'primary',
  size: 'md',
  disabled: false,
  raised: false,
  rounded: false,
  outline: false,
  loading: false,
  ariaLabel: '',
  label: '',
  icon: '',
  iconPos: 'right',
  iconColor: '#fff',
})
</script>

<template>
  <div class="glorious-button">
    <button
      :class="[
        `color-${props.color}`,
        `size-${props.size}`,
        `icon-${props.iconPos}`,
        props.raised ? 'raised' : '',
        props.rounded ? 'rounded' : '',
        props.outline ? 'outline' : '',
      ]"
      :disabled="props.disabled"
      :aria-label="props.ariaLabel"
    >
      <span v-if="!props.loading">{{ props.label }}</span>
      <GLoading
        v-else
        :size="props.size"
        :color="props.outline ? props.color : 'white'"
      />
      <GIcon
        v-if="props.icon && !props.loading"
        :name="props.icon"
        :size="props.size"
        :color="props.iconColor"
      />
    </button>
  </div>
</template>
