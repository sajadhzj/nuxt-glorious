<script lang="ts" setup>
import _props from '../props/File'
import { getAttribute } from '../helper'

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
    <span
      v-if="props.title !== ''"
      class="glorious-title text-sm font-medium text-gray-500"
    >
      {{ getAttribute(props.title, 'file', 'title') }}
      <span
        v-if="getAttribute(props.required, 'file', 'required')"
        class="text-red-500"
      >
        *
      </span>
    </span>
    <label
      :class="[`glorious-file-${getAttribute(props.color, 'file', 'color')}`]"
      class="flex items-center gap-3 text-gray-500 bg-white"
    >
      <div
        class="placeholder"
        :class="[`size-${getAttribute(props.size, 'file', 'size')}`]"
      >
        <span>{{
          getAttribute(props.placeholder, 'file', 'placeholder')
        }}</span>
      </div>
      <input
        type="file"
        class="hidden"
        @change="changeInput($event)"
      />
      <span class="text-xs">{{
        getAttribute(props.text, 'file', 'text')
      }}</span>
      <GIcon
        name="glorious-x"
        color="#ff0000"
        @click.prevent="deleteFile($event)"
      />
    </label>
    <GErrorText :error="props.error" />
  </div>
</template>
