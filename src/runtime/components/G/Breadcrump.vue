<script lang="ts" setup>
const props = defineProps({
  items: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <div class="flex gap-1 flex-wrap">
    <div
      v-for="(item, key, index) in props.items"
      :key="index"
      class="flex items-center gap-1 flex-wrap"
    >
      <nuxt-link
        v-if="index !== Object.entries(props.items).length - 1"
        :to="key"
        class="text-gray-500 hover:text-gray-800"
      >
        {{ item }}
      </nuxt-link>

      <span
        v-if="index === Object.entries(props.items).length - 1"
        class="text-gray-600 font-medium"
      >
        {{ item }}
      </span>

      <GIcon
        v-if="index !== Object.entries(props.items).length - 1"
        name="glorious-arrow"
        style="rotate: 180deg"
        :size="10"
        color="#6b7280"
      />
    </div>
  </div>
</template>
