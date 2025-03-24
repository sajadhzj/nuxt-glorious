<script lang="ts" setup>
import { watch } from '#imports'
import _props from '../props/Drawer'
import { getAttribute } from '../helper'
import { createBlurDom, removeBlurDom } from '../helper'

const props = defineProps(_props)
const modelValue = defineModel()

watch(
  () => modelValue.value,
  () => {
    if (modelValue.value) createBlurDom(() => (modelValue.value = false))
    else removeBlurDom()
  }
)
</script>
<template>
  <div
    :class="[
      getAttribute(props.position, 'drawer', 'position'),
      modelValue ? 'open' : 'close',
    ]"
    class="glorious-drawer close hidden"
  >
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>
