<script lang="ts" setup>
import { useGloriousAppSetting } from "../../composables/useGloriousAppSetting";

const props = defineProps({
  id: {
    required: false,
    default: "drawer",
    type: String,
  },
  dir: {
    require: false,
    default: null,
    type: String as () => "rtl" | "ltr",
  },
});
</script>
<template>
  <div
    :id="props.id"
    :class="[
      props.dir === null ? useGloriousAppSetting.getSetting().dir : props.dir,
    ]"
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
