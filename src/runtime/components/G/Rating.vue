<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])
const computeModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const id = useId()
</script>

<template>
  <div class="rating">
    <template
      v-for="(item, index) in 5"
      :key="index"
    >
      <input
        type="radio"
        :id="`star${index}-${id}`"
        :name="`star-name${index}-${id}`"
        :value="item"
        @input="computeModelValue"
      />
      <label :for="`star${index}-${id}`"></label>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/style/components/rating.scss';
</style>
