<script setup lang="ts">
import _props from '../props/Loading'
import { getAttribute } from '../helper'

const props: any = defineProps(_props)
</script>

<template>
  <div class="inline">
    <div
      class="glorious-loading"
      :style="{
        width: `${getAttribute(props.size, 'icon', 'size')}px`,
        border: `${getAttribute(
          props.stroke,
          'icon',
          'stroke'
        )}px solid ${getAttribute(props.color, 'icon', 'color')}`,
      }"
    />
  </div>
</template>
