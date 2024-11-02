<script lang="ts" setup>
interface breadcrumbInterface {
  text: String;
  icon?: String;
  to?: String;
}

const props = defineProps({
  items: {
    required: true,
    type: Array<breadcrumbInterface>,
  },
  divider: {
    required: false,
    type: String,
    default: "/",
  },
});
</script>

<template>
  <div class="glorious-breadcrumb flex gap-1 flex-wrap">
    <div
      v-for="(item, index) in props.items"
      :key="index"
      class="flex items-center gap-1 flex-wrap"
    >
      <GIcon v-if="item.icon" :name="`${item.icon}`" />
      <nuxt-link
        v-if="item.to"
        class="glorious-breadcrumb-link"
        :to="`${item.to}`"
      >
        {{ item.text }}
      </nuxt-link>
      <span
        v-else
        class="glorious-breadcrumb-text"
        :class="[index + 1 === props.items.length ? 'end-text' : '']"
      >
        {{ item.text }}
      </span>
      <span v-if="index + 1 !== props.items.length">{{ props.divider }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/breadcrumb.scss";
</style>
