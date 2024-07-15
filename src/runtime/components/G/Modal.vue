<script lang="ts" setup>
const props = defineProps({
  id: {
    required: false,
    default: "modal",
    type: String,
  },
  size: {
    required: false,
    default: "md", //[sm,md,lg,xl,full]
    type: String,
  },
  title: {
    required: false,
    default: "",
    type: String,
  },
});
</script>

<template>
  <div
    :id="props.id"
    :class="[`size-${props.size}`]"
    class="glorious-modal close"
  >
    <!-- start title -->
    <div
      v-if="props?.title !== ''"
      class="flex glorious-items-center glorious-justify-between"
    >
      <span class="font-medium">{{ props.title }}</span>
      <GButton
        class="flex glorious-justify-center glorious-align-items-center glorious-w-10"
        size="sm"
        @click="$modal(`${props.id}`)"
      >
        <GIcon name="glorious-x" color="#fff" :size="10" />
      </GButton>
    </div>
    <hr v-if="props.title !== ''" class="glorious-my-3" />
    <!-- end title -->

    <slot />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/modal.scss";
</style>
