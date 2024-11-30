<script lang="ts" setup>
import _props from '../props/File'

const props: any = defineProps(_props)
const modelValue = defineModel()

const changeInput = (event: any) => {
  if (!event.target.files[0]) return
  modelValue.value = event.target.files[0]
  event.target.nextElementSibling.innerText = event.target.files[0].name
  event.target.nextElementSibling.nextElementSibling.style.display = 'flex'
}
const deleteFile = (event: any) => {
  event.currentTarget.style.display = 'none'
  event.currentTarget.previousElementSibling.innerText = props.text
  modelValue.value = null
}
</script>
<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-500">{{ props.title }}</span>
    <label
      :class="[`glorious-file-${props.color}`]"
      class="flex items-center gap-3 text-gray-500"
    >
      <div
        class="placeholder"
        :class="[`size-${props.size}`]"
      >
        <span>{{ props.placeholder }}</span>
      </div>
      <input
        type="file"
        class="hidden"
        @change="changeInput($event)"
      />
      <span class="text-xs">{{ props.text }}</span>
      <GIcon
        name="glorious-x"
        color="#ff0000"
        @click.prevent="deleteFile($event)"
      />
    </label>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss" src="../../style/components/file.scss" />
