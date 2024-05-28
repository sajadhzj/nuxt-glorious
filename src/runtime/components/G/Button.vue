<script lang="ts" setup>
const props = defineProps({
  color: {
    required: false,
    default: "primary",
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String,
  },
  outline: {
    required: false,
    default: false,
    type: Boolean,
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
  loading: {
    requried: false,
    default: false,
    type: Boolean,
  },
  to: {
    requried: false,
    default: "",
    type: String,
  },
});
</script>

<template>
  <button
    v-if="props.to === ''"
    :class="[
      `glorious-button-${props.color}`,
      props.size,
      props.outline ? 'outline' : '',
    ]"
    :disabled="props.disabled"
  >
    <div class="loading" v-if="props.loading">
      <GLoading />
    </div>
    <slot v-else />
  </button>
  <NuxtLink
    v-else
    :to="props.to"
    :class="[
      `glorious-button-${props.color}`,
      props.size,
      props.outline ? 'outline' : '',
    ]"
    :disabled="props.disabled"
  >
    <div class="loading" v-if="props.loading">
      <GLoading />
    </div>
    <slot v-else />
  </NuxtLink>
</template>
