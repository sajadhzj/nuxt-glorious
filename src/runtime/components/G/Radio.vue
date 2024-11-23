<script lang="ts" setup>
import _props from '../props/Radio'
const props = defineProps(_props)
const modelValue = defineModel()

const inputFunction = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement
  modelValue.value = target.checked
}
</script>

<template>
  <label
    class="glorious-radio"
    :class="[props.color, `size-${props.size}`]"
  >
    <input
      :name="props.name"
      type="radio"
      :disabled="props.disabled"
      :value="props.value"
      :checked="props.checked"
      @input="inputFunction($event)"
    />
    <div></div>
  </label>
</template>

<style lang="scss" src="../../assets/style/components/radio.scss" />
