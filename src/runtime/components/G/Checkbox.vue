<script lang="ts" setup>
import _props from '../props/CheckBox'
import { getAttribute } from '../helper'

const props: any = defineProps(_props)
const model = defineModel()
const inputFunction = (event: any) => (model.value = event.target.checked)

model.value = props.checked
</script>

<template>
  <label
    class="glorious-checkbox"
    :class="[
      `color-${getAttribute(props.color, 'checkbox', 'color')}`,
      `size-${getAttribute(props.size, 'checkbox', 'size')}`,
    ]"
  >
    <input
      type="checkbox"
      :checked="getAttribute(props.checked, 'checkbox', 'checked')"
      :disabled="getAttribute(props.disabled, 'checkbox', 'disable')"
      @input="inputFunction($event)"
    />
    <div></div>
  </label>
</template>
