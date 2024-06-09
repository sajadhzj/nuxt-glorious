<script lang="ts" setup>
import { reactive, watch } from "#imports";
const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
  modelValue: {
    required: true,
    type: Number,
  },
});
const el = reactive({
  pageList: [],
});

const emits = defineEmits(["update:modelValue"]);
const methods = {
  emit: (item: any) => {
    if (props.data?.current_page !== item) emits("update:modelValue", item);
  },
  computePageList: () => {
    let count: number = 0;

    for (
      let i: number = props.data?.current_page;
      i > 0 && el.pageList.length <= 2;
      i--
    ) {
      if (!el.pageList.includes(i)) el.pageList.push(i);

      count++;
    }

    let page: number = props.data?.current_page;
    while (count < 5 && page < props.data?.last_page) {
      page++;

      if (!el.pageList.includes(page)) el.pageList.push(page);

      count++;
    }

    if (!el.pageList.includes(props.data?.current_page))
      el.pageList.push(props.data?.current_page);

    el.pageList = el.pageList.sort((a: number, b: number) => a - b);
  },
};
methods.computePageList();
watch(
  () => props.data,
  () => methods.computePageList(),
  { deep: true }
);
</script>

<template>
  <div
    v-if="props.data?.current_page && props.data?.last_page !== 1"
    class="w-max glorious-paginate"
  >
    <div>
      <ClientOnly>
        <GIcon
          v-if="props.data?.current_page !== 1"
          class="ml-2 glorious-cursor-pointer"
          name="glorious-arrow"
          :size="15"
          @click="methods.emit(props.data?.current_page - 1)"
        />
        <GIcon
          v-else
          name="glorious-arrow"
          :size="15"
          class="ml-2"
          color="#cbd5e1"
        />
      </ClientOnly>

      <div
        v-for="(item, index) in el.pageList"
        :key="index"
        class="w-6 h-6 rounded-lg flex items-center justify-center paginate"
        :class="[
          props.data?.current_page === item
            ? 'active'
            : 'glorious-cursor-pointer',
        ]"
        @click="methods.emit(item)"
      >
        {{ item }}
      </div>

      <ClientOnly>
        <GIcon
          v-if="props.data?.current_page !== props.data?.last_page"
          name="glorious-arrow"
          class="mr-2 glorious-cursor-pointer"
          :size="15"
          @click="methods.emit(props.data?.current_page + 1)"
        />
        <GIcon
          v-else
          name="glorious-arrow"
          color="#cbd5e1"
          class="mr-2 glorious-cursor-pointer"
        />
      </ClientOnly>
    </div>
  </div>
</template>
