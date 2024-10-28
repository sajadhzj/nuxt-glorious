<script lang="ts" setup>
const props = defineProps({
  color: {
    required: false,
    default: "blue",
    type: String as () => "orange" | "blue" | "gray" | "red" | "green",
  },
});
</script>

<template>
  <div class="glorious-alert" :class="[`color-${props.color}`]">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/alert.scss";
</style>
