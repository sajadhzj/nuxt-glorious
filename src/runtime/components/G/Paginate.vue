<script lang="ts" setup>
import { watch, ref } from '#imports'
import _props from '../props/Paginate'

const props = defineProps(_props)
const modelValue = defineModel()
const emits = defineEmits(['change'])

const emit = (item: any) => {
  if (props.currentPage !== item) {
    modelValue.value = item
    emits('change', { page: item })
  }
}

const listPage = ref<Array<Number>>([])

const computeListPage = () => {
  listPage.value = []
  let firstPage = props.currentPage - props.numberSuggestPage
  const endPage = props.currentPage + (props.numberSuggestPage + 1)

  while (firstPage <= endPage) {
    if (firstPage > 0 && firstPage <= props.lastPage)
      listPage.value.push(firstPage)
    firstPage++
  }
}
computeListPage()
watch(
  () => props.currentPage,
  () => computeListPage()
)

const arrowPrevious = () => {
  if (props.currentPage !== 1) emit(props.currentPage - 1)
}
const arrowNext = () => {
  if (props.currentPage !== props.lastPage) emit(props.currentPage + 1)
}
</script>

<template>
  <div
    v-if="props.currentPage && props.lastPage !== 1"
    class="w-max glorious-paginate"
  >
    <div>
      <GIcon
        :color="props.currentPage !== 1 ? '#000' : '#cbd5e1'"
        class="ml-2 cursor-pointer"
        name="glorious-arrow"
        :size="15"
        @click="arrowPrevious()"
      />

      <div
        v-for="(item, index) in listPage"
        :key="index"
        class="w-6 h-6 rounded-lg flex items-center justify-center paginate font-bold"
        :class="[props.currentPage === item ? 'active' : 'cursor-pointer']"
        @click="emit(item)"
      >
        {{ item }}
      </div>

      <GIcon
        :color="props.currentPage !== props.lastPage ? '#000' : '#cbd5e1'"
        name="glorious-arrow"
        class="mr-2 cursor-pointer"
        :size="15"
        @click="arrowNext"
      />
    </div>
  </div>
</template>

<style lang="scss" src="../../assets/style/components/paginate.scss" />
