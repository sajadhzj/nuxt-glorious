<script lang="ts" setup>
import { GloriousStore } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: String,
  },
  color: {
    required: false,
    default: "primary",
    type: String,
  },
  placeholder: {
    required: false,
    default: "",
    type: String,
  },
  title: {
    required: false,
    default: "",
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String,
  },
  error: {
    required: false,
    default: "|",
    type: String,
  },
});
const gs: any = GloriousStore();
const error: any = props.error.split("|");
const emits = defineEmits(["update:modelValue"]);

const changeInput = (event: any) => {
  if (!event.target.files[0]) return;
  emits("update:modelValue", event.target.files[0]);
  event.target.nextElementSibling.innerText = event.target.files[0].name;
  event.target.nextElementSibling.nextElementSibling.style.display = "flex";
};
const deleteFile = (event: any) => {
  event.currentTarget.style.display = "none";
  event.currentTarget.previousElementSibling.innerText =
    "فایلی انتخاب نشده است";
  emits("update:modelValue", null);
};
</script>
<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <label
      :class="[`glorious-file-${props.color}`]"
      class="flex items-center gap-3 text-gray-500"
    >
      <div class="placeholder" :class="[props.size]">
        <span>{{ props.placeholder }}</span>
      </div>
      <input type="file" class="hidden" @change="changeInput($event)" />
      <span class="text-[12px]">فایلی انتخاب نشده است</span>
      <GIcon
        name="glorious-x"
        color="#ff0000"
        @click.prevent="deleteFile($event)"
      />
    </label>
    <span class="glorious-error-text" v-if="gs[error[0]]?.errors[error[1]]">
      {{ gs[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>
