<script setup lang="ts">
import type { colorType, sizeType } from '~/src/types/props'

interface loadingPropInterface {
  color?: colorType
  size?: sizeType
}

const props: any = withDefaults(defineProps<loadingPropInterface>(), {
  color: 'primary',
  size: 'md',
})
</script>

<template>
  <div class="inline">
    <div
      class="glorious-loading"
      :class="[`color-${props.color}`, `size-${props.size}`]"
    />
  </div>
</template>
