<script lang="ts" setup>
import { useId, ref } from '#imports'

const filler = ref(true)
const id = useId()
const value = [5, 4, 3, 2, 1]
const modelValue: any = defineModel()
const computeModelValue = (event: Event) => {
  const check = document.querySelectorAll(`input[name=star-name${id}]`)
  check.forEach((item) => {
    item.nextElementSibling?.classList.remove('checked')
  })
  filler.value = false
  const target = event.target as HTMLInputElement
  modelValue.value = target.value
}
</script>

<template>
  <div class="rating">
    <template
      v-for="(item, index) in 5"
      :key="index"
    >
      <input
        type="radio"
        :id="`star${item}-${id}`"
        :name="`star-name${id}`"
        :value="value[index]"
        @input="computeModelValue"
      />
      <label
        :for="`star${item}-${id}`"
        :class="[value[index] < modelValue + 1 && filler ? 'checked' : '']"
      />
    </template>
  </div>
</template>

<style scoped lang="scss" src="../../style/components/rating.scss" />
