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
    :class="[`size-${props.size}`]"
    :id="props.id"
    class="glorious-modal close"
  >
    <!-- start title -->
    <div
      class="flex glorious-items-center glorious-justify-between"
      v-if="props?.title !== ''"
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
    <hr class="glorious-my-3" v-if="props.title !== ''" />
    <!-- end title -->

    <slot />
  </div>
</template>
