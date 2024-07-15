<script lang="ts" setup>
import { useGloriousAppSetting } from "../../composables/useGloriousAppSetting";

const props = defineProps({
  id: {
    required: false,
    default: "drawer",
    type: String,
  },
});
</script>
<template>
  <div
    :id="props.id"
    :class="[useGloriousAppSetting.getSetting().dir]"
    class="drawer close hidden"
  >
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/drawer.scss";
</style>
