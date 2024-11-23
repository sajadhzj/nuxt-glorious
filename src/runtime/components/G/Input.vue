<script setup lang="ts">
import { computed, ref, watch } from '#imports'
import { useGloriousCore } from '../../composables/useGloriousCore'
import _props from '../props/Input'

const props = defineProps({
  modelValue: {
    required: false,
    default: '',
    type: [String, Array<String>, Number],
  },
  ..._props,
})

const inputValue: any = ref(null)

const emits = defineEmits(['update:modelValue'])

watch(
  () => inputValue.value,
  () => {
    if (props.mode === 'tag') return

    switch (props.display) {
      case 'price':
        inputValue.value = useGloriousCore.numbersWithSeperateSamePrice(
          inputValue.value
        )
        emits(
          'update:modelValue',
          inputValue.value.toString().replaceAll(',', '')
        )
        break
      default:
        emits('update:modelValue', inputValue.value)
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
    case 'xsm':
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
  emits('update:modelValue', tags.value)
  inputValue.value = ''
}

const addTagViaOption = (option: any, event: any) => {
  //   event.stopPropagation() if want not close with window
  if (tags.value.length === 0) tags.value = []

  const value: any = option
  tags.value.push(value)
  emits('update:modelValue', tags.value)
  inputValue.value = ''
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item: any) => item !== tag)
  emits('update:modelValue', tags.value)
}

// -------------------------------------- init value
const initValue = () => {
  if (props.mode === 'tag') {
    tags.value = props.modelValue
    return
  }

  inputValue.value = props.modelValue
}
initValue()
watch(
  () => props.modelValue,
  () => initValue()
)

const typeInput = ref(props.type)

const inputClicked = (event: any) => {
  if (props.mode === 'tag' && props.options) {
    const gio = document.querySelectorAll('.glorious-input-options')
    gio.forEach((element: any) => element.classList.add('hidden'))

    const optionsElement = event.currentTarget.parentElement.children[1]
    if (optionsElement.classList.contains('hidden'))
      optionsElement.classList.remove('hidden')
  }
}
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div
      class="glorious-input"
      :class="[props.icon !== '' ? `icon-${props.size}` : '']"
    >
      <div class="relative">
        <input
          v-model="inputValue"
          :inputmode="props.inputMode"
          :autocomplete="props.autocomplete"
          class="w-full glorious-input-field"
          :class="[
            props.size,
            `glorious-input-${props.color}`,
            props.type === 'password' ? 'pl-[30px] pr-3' : 'px-3',
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
            v-if="props.loadingOptions"
            class="flex justify-center"
          >
            <GLoading color="green" />
          </div>
          <template v-else>
            <div
              v-for="(option, index) in props.options"
              :key="index"
              @click="addTagViaOption(option, $event)"
            >
              {{ option.text }}
            </div>
          </template>
        </div>
      </div>
      <div
        v-if="tags.length !== 0"
        class="glorious-input-tag"
      >
        <div
          v-for="(item, index) in tags"
          :key="index"
        >
          {{ typeof item === 'object' ? item.text : item }}
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
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss">
@import '../../assets/style/components/input.scss';
</style>
