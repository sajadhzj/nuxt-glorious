<script lang="ts" setup>
import { GloriousStore } from "#imports";
const props = defineProps({
  error: {
    required: false,
    default: "|",
    type: String,
  },
});
const gs = GloriousStore();
const error: any = props.error.split("|");
</script>
<template>
  <span
    v-if="gs.forms[error[0]]?.errors[error[1]]"
    class="text-red-500 text-[14px]"
  >
    {{ gs.forms[error[0]].errors[error[1]][0] }}
  </span>
</template>
