<script setup lang="ts">
import { computed, ref, watch, useGloriousCore } from '#imports'
import { hasValidationError } from '../helper'
import _props from '../props/Input'

const props: any = defineProps(_props)
const modelValue = defineModel()
const { numbersWithSeparateSamePrice } = useGloriousCore()
modelValue.value = ''
const inputValue: any = ref(null)

watch(
  () => inputValue.value,
  () => {
    if (props.mode === 'tag') return

    switch (props.display) {
      case 'price':
        inputValue.value = numbersWithSeparateSamePrice(inputValue.value)
        modelValue.value = inputValue.value.toString().replaceAll(',', '')
        break
      default:
        modelValue.value = inputValue.value
        break
    }
  }
)

const computeIconSize = computed(() => {
  let iconSize = 0

  switch (props.size) {
    case 'xl':
      iconSize = 30
      break
    case 'lg':
      iconSize = 27
      break
    case 'md':
      iconSize = 25
      break
    case 'sm':
      iconSize = 23
      break
    case 'xs':
      iconSize = 20
      break
    default:
      iconSize = 30
      break
  }

  return iconSize
})

// ------------------------------------------------------------------------------------------------ TAG
const tags: any = ref([])

const addTag = (event: any) => {
  if (props.tagLockOption) return

  if (tags.value.length === 0) tags.value = []

  if (props.mode !== 'tag') return
  const value: any = event.target.value
  tags.value.push(value)
  modelValue.value = tags.value
  inputValue.value = ''
}

const addTagViaOption = (option: any, event: any) => {
  //   event.stopPropagation() if want not close with window
  if (
    typeof tags.value === 'string' ||
    typeof tags.value === 'undefined' ||
    tags.value.length === 0
  )
    tags.value = []

  const find = tags.value.find((item: any) => item.value === option.value)

  if (typeof find === 'undefined') {
    const value: any = option
    tags.value.push(value)
    modelValue.value = tags.value
    inputValue.value = ''
  }
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item: any) => item !== tag)
  modelValue.value = tags.value
}

// -------------------------------------- init value
const initValue = () => {
  if (props.mode === 'tag') {
    tags.value = modelValue.value
    return
  }

  inputValue.value = modelValue.value
}
initValue()
watch(
  () => modelValue.value,
  () => initValue()
)

const typeInput = ref(props.type)

const inputClicked = (event: any) => {
  if (props.mode === 'tag' && props.options) {
    const gio = document.querySelectorAll('.glorious-input-options')
    gio.forEach((element: any) => element.classList.add('hidden'))

    const optionsElement = event.currentTarget.parentElement.children[1]
    if (
      typeof optionsElement !== 'undefined' &&
      optionsElement.classList.contains('hidden')
    )
      optionsElement.classList.remove('hidden')
  }
}
</script>

<template>
  <div class="flex flex-col">
    <span class="glorious-title text-sm font-medium text-gray-500">
      {{ props.title }}
      <span
        v-if="props.required"
        class="text-red-500"
      >
        *
      </span>
    </span>

    <div
      class="glorious-input"
      :class="[
        props.icon !== '' ? `icon-${props.size}` : '',
        hasValidationError(props.error) ? 'validation-error' : '',
      ]"
    >
      <div class="relative">
        <input
          v-model="inputValue"
          :inputmode="props.inputMode"
          :autocomplete="props.autocomplete"
          class="w-full glorious-input-field"
          :class="[
            `size-${props.size}`,
            `glorious-input-${props.color}`,
            props.type === 'password' ? 'pl-[30px] pr-3' : 'px-3',
            `mode-${props.mode}`,
          ]"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :type="typeInput"
          @keyup.enter="addTag($event)"
          @click="inputClicked($event)"
        />
        <GIcon
          v-if="props.type === 'password' && typeInput === 'password'"
          class="absolute left-0 top-0 bottom-0 my-auto ml-1 cursor-pointer"
          :size="23"
          name="glorious-eye-fill"
          @click="typeInput = 'text'"
        ></GIcon>
        <GIcon
          v-if="props.type === 'password' && typeInput === 'text'"
          class="absolute left-0 top-0 bottom-0 my-auto ml-1 cursor-pointer"
          :size="23"
          name="glorious-eye-off-fill"
          @click="typeInput = 'password'"
        ></GIcon>

        <div
          v-if="props.options.length > 0"
          class="glorious-input-options hidden"
          :class="[`size-${props.size}`]"
        >
          <div
            v-if="props.loading"
            class="flex justify-center"
          >
            <GLoading color="green" />
          </div>
          <div v-else>
            <div
              v-for="(option, index) in props.options"
              :key="index"
              @click="addTagViaOption(option, $event)"
            >
              {{ option[props.displayTextKey] }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="tags?.length !== 0"
        class="glorious-input-tag"
      >
        <div
          v-for="(item, index) in tags"
          :key="index"
        >
          {{ typeof item === 'object' ? item[props.displayTextKey] : item }}
          <GIcon
            name="glorious-x"
            :size="10"
            color="#ff0000"
            @click="removeTag(item)"
          />
        </div>
      </div>
      <GIcon
        v-if="props.icon !== ''"
        class="glorious-input-icon"
        :name="props.icon"
        :size="computeIconSize"
      />
      <div
        v-if="props.loadingOptions"
        class="absolute top-1 bottom-0 my-auto left-1"
      >
        <GLoading color="green" />
      </div>
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss" src="../../style/components/input.scss" />
