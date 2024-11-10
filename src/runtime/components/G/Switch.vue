<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: false,
    default: true,
    type: Boolean,
  },
  checked: {
    required: false,
    default: false,
    type: Boolean,
  },
  color: {
    required: false,
    default: 'green',
    type: String as () => 'orange' | 'blue' | 'gray' | 'red' | 'green',
  },
})

const emits = defineEmits(['update:modelValue'])
const input = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('update:modelValue', target.checked)
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

<style lang="scss">
@import '../../assets/style/components/switch.scss';
</style>
