<script lang="ts" setup>
import _props from '../props/Button'
import { getAttribute } from '../helper'

const props: any = defineProps(_props)
</script>

<template>
  <button
    v-if="props.to === ''"
    :aria-label="props.ariaLabel"
    :class="[
      `glorious-button`,
      `button-color-${getAttribute(props.color, 'button', 'color')}`,
      `size-${getAttribute(props.size, 'button', 'size')}`,
      getAttribute(props.outline, 'button', 'outline') ? 'outline' : '',
    ]"
    :disabled="getAttribute(props.disabled, 'button', 'disable')"
  >
    <div
      v-if="getAttribute(props.loading, 'button', 'loading')"
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
      `button-color-${getAttribute(props.color, 'button', 'color')}`,
      `size-${getAttribute(props.size, 'button', 'size')}`,
      getAttribute(props.outline, 'button', 'outline') ? 'outline' : '',
    ]"
    :disabled="getAttribute(props.disabled, 'button', 'disable')"
  >
    <slot />
  </NuxtLink>
</template>
