<script lang="ts" setup>
import type { colorType } from '~/src/types/props'

interface propsInterface {
  color?: colorType
  title: string
  description: string
  icon?: string
}

const propsInterface = withDefaults(defineProps<propsInterface>(), {
  color: 'primary',
})
</script>

<template>
  <div
    class="glorious-alert"
    :class="[`color-${propsInterface.color}`]"
  >
    <div>
      <h3 class="glorious-alert-title">{{ propsInterface.title }}</h3>
      <p class="glorious-alert-description">{{ propsInterface.description }}</p>
    </div>
    <div
      v-if="propsInterface.icon"
      class="icon"
    >
      <GIcon
        :name="propsInterface.icon"
        :color="propsInterface.color"
      />
    </div>
  </div>
</template>
