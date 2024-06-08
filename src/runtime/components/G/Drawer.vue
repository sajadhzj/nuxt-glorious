<template>
  <div class="drawer close hidden" :id="props.id">
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    required: false,
    default: 'drawer'
  }
})
</script>