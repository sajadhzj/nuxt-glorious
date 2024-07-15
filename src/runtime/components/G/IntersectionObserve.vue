<script setup lang="ts">
import { onMounted, useId } from "#imports";
const elementId = useId();
const emits = defineEmits(["intersect"]);

onMounted(() => {
  const element: any = document.querySelector(
    `#intersection-observe-${elementId}`
  );

  const observe: any = new IntersectionObserver((event: any) => {
    if (event[0].isIntersecting) emits("intersect", true);
  });

  observe.observe(element);
});
</script>
<template>
  <div :id="`intersection-observe-${elementId}`">
    <slot />
  </div>
</template>
