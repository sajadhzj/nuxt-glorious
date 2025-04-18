<script lang="ts" setup>
import _props from '../props/Avatar'
import { getAttribute } from '../helper'

const props: any = defineProps(_props)
</script>

<template>
  <div
    class="glorious-avatar"
    :class="[
      `size-${getAttribute(props.size, 'avatar', 'size')}`,
      `rounded-${getAttribute(props.rounded, 'avatar', 'rounded')}`,
    ]"
  >
    <nuxt-img
      :src="props.src"
      :alt="getAttribute(props.rounded, 'avatar', 'alt')"
    />
  </div>
</template>
