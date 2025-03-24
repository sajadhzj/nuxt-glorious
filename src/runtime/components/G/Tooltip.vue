<script lang="ts" setup>
const props = defineProps({
  text: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <div class="glorious-tooltip">
    <div class="tooltip-slot">
      <slot />
    </div>
    <div class="tooltip-content">{{ props.text }}</div>
  </div>
</template>
