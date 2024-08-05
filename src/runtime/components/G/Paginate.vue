<script lang="ts" setup>
import { watch, ref } from "#imports";
const props = defineProps({
  currentPage: {
    required: true,
    type: Number,
    default: 1,
  },
  lastPage: {
    required: true,
    type: Number,
    default: 1,
  },
  numberSugestPage: {
    required: false,
    type: Number,
    default: 3,
  },
  modelValue: {
    required: true,
    type: Number,
  },
});

const emits = defineEmits(["update:modelValue"]);

const emit = (item: any) => {
  if (props.currentPage !== item) emits("update:modelValue", item);
};

const listPage = ref<Array<Number>>([]);

const computeListPage = () => {
  listPage.value = [];
  let firstPage = props.currentPage - props.numberSugestPage;
  const endPage = props.currentPage + (props.numberSugestPage + 1);

  while (firstPage < endPage) {
    if (firstPage > 0 && firstPage <= props.lastPage)
      listPage.value.push(firstPage);
    firstPage++;
  }
};
computeListPage();
watch(
  () => props.currentPage,
  () => computeListPage()
);

const arrowPrevious = () => {
  if (props.currentPage !== 1) emit(props.currentPage - 1);
};
const arrowNext = () => {
  if (props.currentPage !== props.lastPage) emit(props.currentPage + 1);
};
</script>

<template>
  <div
    v-if="props.currentPage && props.lastPage !== 1"
    class="w-max glorious-paginate"
  >
    ds
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
        class="w-6 h-6 rounded-lg flex items-center justify-center paginate"
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

<style lang="scss">
@import "../../assets/style/components/paginate.scss";
</style>
