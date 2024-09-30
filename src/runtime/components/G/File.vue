<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: true,
    type: null,
  },
  color: {
    required: false,
    default: "primary",
    type: String as () => "orange" | "blue" | "gray" | "red" | "primary",
  },
  placeholder: {
    required: false,
    default: "choose file",
    type: String,
  },
  title: {
    required: false,
    default: "file",
    type: String,
  },
  text: {
    required: false,
    default: "No file has been selected",
    type: String,
  },
  size: {
    required: false,
    default: "md",
    type: String as () => "xl" | "lg" | "md" | "sm" | "xsm",
  },
  error: {
    required: false,
    default: "|",
    type: String,
  },
});
const emits = defineEmits(["update:modelValue"]);

const changeInput = (event: any) => {
  if (!event.target.files[0]) return;
  emits("update:modelValue", event.target.files[0]);
  event.target.nextElementSibling.innerText = event.target.files[0].name;
  event.target.nextElementSibling.nextElementSibling.style.display = "flex";
};
const deleteFile = (event: any) => {
  event.currentTarget.style.display = "none";
  event.currentTarget.previousElementSibling.innerText = props.text;
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
      <span class="text-[12px]">{{ props.text }}</span>
      <GIcon
        name="glorious-x"
        color="#ff0000"
        @click.prevent="deleteFile($event)"
      />
    </label>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/file.scss";
</style>
