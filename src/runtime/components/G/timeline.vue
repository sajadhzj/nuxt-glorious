<script lang="ts" setup>
import _props from '../props/Timeline'
const props: any = defineProps(_props)
</script>
<template>
  <div class="flex gap-3 mr-4">
    <div
      class="flex flex-col gap-5 glorious-timeline-items"
      :class="[`color-${props.color}`]"
    >
      <div
        v-for="(item, index) in props.items.reverse()"
        :key="index"
      >
        <div class="glorious-timeline-items-count">
          {{ props.items.length - index }}
        </div>
        <slot
          name="item"
          :item="item"
        >
        </slot>
      </div>
    </div>
  </div>
</template>
