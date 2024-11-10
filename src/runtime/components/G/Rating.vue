<template>
  <div class="flex gap-2">
    <div
      v-for="(item, index) in 5"
      :key="index"
      class="cursor-pointer start-box"
      @click="methods.computeStar($event, 5 - index)"
    >
      <GIcon
        name="glorious-star-line"
        size="20"
      />
      <GIcon
        v-show="false"
        name="glorious-star-fill"
        size="20"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['update:modelValue'])
const methods = {
  computeStar: (event, index) => {
    emits('update:modelValue', index)
    let cEvent = event.currentTarget
    cEvent.children[0].style.display = 'none'
    cEvent.children[1].style.display = 'inline'

    for (let i = index; i > 1; i--) {
      cEvent = cEvent.nextElementSibling
      cEvent.children[0].style.display = 'none'
      cEvent.children[1].style.display = 'inline'
    }

    let pEvent = event.currentTarget
    for (let i = 10; i > 1; i--) {
      if (pEvent.previousElementSibling !== null) {
        pEvent = pEvent.previousElementSibling
        pEvent.children[0].style.display = 'inline'
        pEvent.children[1].style.display = 'none'
      }
    }
  },
}
</script>

<style scoped lang="scss"></style>
