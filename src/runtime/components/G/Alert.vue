<script lang="ts" setup>
import _props from './../props/Alert'
import { getAttribute } from '../helper'

const props = defineProps(_props)
</script>

<template>
  <div
    class="glorious-alert"
    :class="[
      `color-${getAttribute(props.color, 'alert', 'color')}`,
      getAttribute(props.color, 'alert', 'color'),
    ]"
  >
    <slot />
  </div>
</template>
