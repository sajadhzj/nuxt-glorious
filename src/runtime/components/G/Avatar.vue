<script lang="ts" setup>
const props = defineProps({
  src: {
    required: true,
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "xs",
  },
  rounded: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "xs" | "full",
  },
});
</script>

<template>
  <div
    class="glorious-avatar overflow-hidden"
    :class="[`size-${props.size}`, `rounded-${props.rounded}`]"
  >
    <img :src="props.src" />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/avatar.scss";
</style>
