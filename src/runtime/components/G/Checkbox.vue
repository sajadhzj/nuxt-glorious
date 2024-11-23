<script lang="ts" setup>
import _props from '../props/CheckBox'

const props: any = defineProps(_props)
const model = defineModel()
const inputFunction = (event: any) => (model.value = event.target.checked)

model.value = props.checked
</script>

<template>
  <label
    class="glorious-checkbox"
    :class="[`color-${props.color}`, `size-${props.size}`]"
  >
    <input
      type="checkbox"
      :checked="props.checked"
      :disabled="props.disabled"
      @input="inputFunction($event)"
    />
    <div></div>
  </label>
</template>

<style lang="scss" src="../../assets/style/components/checkbox.scss" />
