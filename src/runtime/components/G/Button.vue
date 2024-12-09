<script lang="ts" setup>
import _props from '../props/Button'

const props: any = defineProps(_props)
</script>

<template>
  <button
    v-if="props.to === ''"
    :aria-label="props.ariaLabel"
    :class="[
      `glorious-button`,
      `color-${props.color}`,
      `size-${props.size}`,
      props.outline ? 'outline' : '',
    ]"
    :disabled="props.disabled"
  >
    <div
      v-if="props.loading"
      class="loading flex justify-center"
    >
      <GLoading />
    </div>
    <slot v-else />
  </button>
  <NuxtLink
    v-else
    :to="props.to"
    :class="[
      `glorious-button`,
      `button-color-${props.color}`,
      `size-${props.size}`,
      props.outline ? 'outline' : '',
    ]"
    :disabled="props.disabled"
  >
    <slot />
  </NuxtLink>
</template>

<style lang="scss" src="../../style/components/button.scss" />
