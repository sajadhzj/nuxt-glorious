<script lang="ts" setup>
const emits = defineEmits(['update:modelValue'])
const computeModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const id = useId()
const value = [5, 4, 3, 2, 1]
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
      <label :for="`star${item}-${id}`"></label>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/style/components/rating.scss';
</style>
