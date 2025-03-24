<script lang="ts" setup>
import { watch, ref } from '#imports'
import _props from '../props/Paginate'
import { getAttribute } from '../helper'

const props = defineProps(_props)
const modelValue = defineModel()
const emits = defineEmits(['change'])

const emit = (item: any) => {
  if (getAttribute(props.currentPage, 'paginate', 'currentPage') !== item) {
    modelValue.value = item
    emits('change', { page: item })
  }
}

const listPage = ref<Array<Number>>([])

const computeListPage = () => {
  listPage.value = []
  let firstPage =
    getAttribute(props.currentPage, 'paginate', 'currentPage') -
    getAttribute(props.numberSuggestPage, 'paginate', 'numberSuggestPage')
  const endPage =
    getAttribute(props.currentPage, 'paginate', 'currentPage') +
    (getAttribute(props.numberSuggestPage, 'paginate', 'numberSuggestPage') + 1)

  while (firstPage <= endPage) {
    if (
      firstPage > 0 &&
      firstPage <= getAttribute(props.lastPage, 'paginate', 'lastPage')
    )
      listPage.value.push(firstPage)
    firstPage++
  }
}
computeListPage()
watch(
  () => getAttribute(props.currentPage, 'paginate', 'currentPage'),
  () => computeListPage()
)

const arrowPrevious = () => {
  if (getAttribute(props.currentPage, 'paginate', 'currentPage') !== 1)
    emit(getAttribute(props.currentPage, 'paginate', 'currentPage') - 1)
}
const arrowNext = () => {
  if (
    getAttribute(props.currentPage, 'paginate', 'currentPage') !==
    getAttribute(props.lastPage, 'paginate', 'lastPage')
  )
    emit(getAttribute(props.currentPage, 'paginate', 'currentPage') + 1)
}
</script>

<template>
  <div
    v-if="
      getAttribute(props.currentPage, 'paginate', 'currentPage') &&
      getAttribute(props.lastPage, 'paginate', 'lastPage') !== 1
    "
    class="w-max glorious-paginate"
    :class="[`color-${getAttribute(props.color, 'paginate', 'color')}`]"
  >
    <div>
      <GIcon
        :color="
          getAttribute(props.currentPage, 'paginate', 'currentPage') !== 1
            ? '#000'
            : '#cbd5e1'
        "
        class="ml-2 cursor-pointer"
        name="glorious-arrow"
        :size="15"
        @click="arrowPrevious()"
      />

      <div
        v-for="(item, index) in listPage"
        :key="index"
        class="w-6 h-6 rounded-lg flex items-center justify-center paginate font-bold"
        :class="[
          getAttribute(props.currentPage, 'paginate', 'currentPage') === item
            ? 'active'
            : 'cursor-pointer',
        ]"
        @click="emit(item)"
      >
        {{ item }}
      </div>

      <GIcon
        :color="
          getAttribute(props.currentPage, 'paginate', 'currentPage') !==
          getAttribute(props.lastPage, 'paginate', 'lastPage')
            ? '#000'
            : '#cbd5e1'
        "
        name="glorious-arrow"
        class="mr-2 cursor-pointer"
        :size="15"
        @click="arrowNext"
      />
    </div>
  </div>
</template>
