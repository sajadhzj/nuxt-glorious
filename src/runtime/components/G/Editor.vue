<script lang="ts" setup>
const props = defineProps({
  rows: {
    required: false,
    default: 10,
    type: Number,
  },
  toolbar: {
    required: false,
    default: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
    type: Array<Object>,
  },
  placeholder: {
    required: false,
    default: "",
    type: String,
  },
  error: {
    required: false,
    default: "|",
    type: String,
  },
  title: {
    required: false,
    default: "",
    type: String,
  },
  modelValue: {
    required: false,
    default: "",
    type: String,
  },
});
const { $quillModule }: any = useNuxtApp();

const modules = {
  name: "imageUploader",
  module: $quillModule?.image,
  options: {
    upload: (file: File) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);
        useGloriousFetch("/editor/image", {
          gKey: "uploadEditor",
          body: formData,
        })
          .then((data: any) => resolve(data.data.path))
          .catch(() => reject("Upload failed"));
      });
    },
  },
};
const gs: any = GloriousStore();
const error: any = props.error.split("|");

const emits = defineEmits(["update:modelValue"]);
const value = ref(null);

watch(
  () => value.value,
  () => emits("update:modelValue", value.value)
);

// -------------------------------------- init value
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>
<template>
  <div>
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <ClientOnly>
      <QuillEditor
        :modules="modules"
        :toolbar="props.toolbar"
        rows="5"
        contentType="html"
        v-model:content="value"
        :placeholder="props.placeholder"
        :style="{ height: props.rows * 30 + 'px' }"
      />
    </ClientOnly>
    <span
      class="text-[12px] text-red-500"
      v-if="gs[error[0]]?.errors[error[1]]"
    >
      {{ gs[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>
