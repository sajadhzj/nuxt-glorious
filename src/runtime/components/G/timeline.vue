<script lang="ts" setup>
const props = defineProps({
  items: {
    required: true,
  },
  color: {
    required: false,
    default: 'green',
    type: String as () => 'orange' | 'blue' | 'gray' | 'red' | 'green',
  },
})
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

<style scoped lang="scss">
@import '../../assets/style/components/timeline.scss';
</style>
