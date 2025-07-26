<script setup lang="ts">
import type { sizeType } from '~/src/types/props'
interface propsInterface {
  size?: sizeType
  alt?: string
  src: string
  rounded: boolean
}
const props = withDefaults(defineProps<propsInterface>(), {
  size: 'md',
  alt: 'avatar',
  rounded: false,
})
</script>

<template>
  <div
    :class="[
      'glorious-avatar',
      `size-${props.size}`,
      props.rounded ? 'circle' : '',
    ]"
  >
    <nuxt-img
      v-if="src"
      :src="src"
      :alt="alt"
    />
  </div>
</template>
