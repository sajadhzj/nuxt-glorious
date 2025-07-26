<template>
  <div
    class="glorious-accordion"
    :class="{ open: isOpen }"
  >
    <div
      class="glorious-accordion-header"
      @click="toggle"
    >
      <slot name="header" />

      <GIcon
        name="glorious-arrow"
        :size="15"
        :class="{ rotated: isOpen }"
      />
    </div>

    <div
      class="glorious-accordion-body-wrapper"
      :style="{ maxHeight: isOpen ? maxHeight + 'px' : '0' }"
      ref="bodyWrapper"
    >
      <div
        class="glorious-accordion-body"
        ref="body"
      >
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const body = ref(null)
const bodyWrapper = ref(null)
const maxHeight = ref(0)

const toggle = () => (isOpen.value = !isOpen.value)

watch(
  isOpen,
  (val) => (maxHeight.value = body.value ? body.value.scrollHeight : 0)
)
</script>
