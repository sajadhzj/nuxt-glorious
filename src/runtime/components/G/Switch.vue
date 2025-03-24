<script lang="ts" setup>
import _props from '../props/Switch'

const props = defineProps(_props)
const modelValue = defineModel()
const input = (e: Event) => {
  const target = e.target as HTMLInputElement
  modelValue.value = target.checked
}
</script>

<template>
  <div>
    <label
      class="switch"
      :class="[`color-${props.color}`]"
    >
      <input
        type="checkbox"
        @input="input"
        :checked="props.checked"
      />
      <span class="switch-slider"></span>
    </label>
  </div>
</template>
