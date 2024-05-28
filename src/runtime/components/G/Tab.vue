<script lang="ts" setup>
interface itemsType {
  active: boolean;
  text: string;
  key: string;
}

const props = defineProps({
  items: {
    required: true,
    default: [],
    type: Array<itemsType>,
  },
  modelValue: {
    required: true,
    type: String,
  },
});
const emits = defineEmits(["update:modelValue"]);
const tabClicked: any = (key: string, event: any) => {
  emits("update:modelValue", key);
  Array.from(event.currentTarget.parentElement.parentElement.children).map(
    (item: any) => item.children[0].classList.remove("active")
  );
  event.currentTarget.classList.add("active");
};
</script>

<template>
  <div class="glorious-tab">
    <div
      v-for="(item, index) in props.items"
      :key="index"
      class="flex glorious-justify-center"
      :style="{ flexBasis: `${100 / props.items.length}%` }"
    >
      <button
        :class="item.active ? `active` : ''"
        @click="tabClicked(item.key, $event)"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>
