<script lang="ts" setup>
import _props from '../props/Radio'
import { getAttribute } from '../helper'

const props = defineProps(_props)
const modelValue = defineModel()

const inputFunction = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement
  modelValue.value = target.value
}
</script>

<template>
  <label
    class="glorious-radio"
    :class="[
      getAttribute(props.color, 'radio', 'color'),
      `size-${getAttribute(props.size, 'radio', 'size')}`,
    ]"
  >
    <input
      :name="getAttribute(props.checked, 'radio', 'checked')"
      type="radio"
      :disabled="props.disabled"
      :value="props.value"
      :checked="getAttribute(props.checked, 'radio', 'checked')"
      @input="inputFunction($event)"
    />
    <div></div>
  </label>
</template>
