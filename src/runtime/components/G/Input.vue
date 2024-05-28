<script setup lang="ts">
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
  icon: {
    required: false,
    default: "",
    type: String,
  },
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
});
const inputValue = ref(null);
const emits = defineEmits(["update:modelValue"]);
const gs: any = GloriousStore();
const error: any = props.error.split("|");
watch(
  () => inputValue.value,
  () => emits("update:modelValue", inputValue.value)
);

const computeIconSize = computed(() => {
  let iconSize = 0;

  switch (props.size) {
    case "xl":
      iconSize = 30;
      break;
    case "lg":
      iconSize = 27;
      break;
    case "md":
      iconSize = 25;
      break;
    case "sm":
      iconSize = 23;
      break;
    case "xsm":
      iconSize = 20;
      break;
    default:
      iconSize = 30;
      break;
  }

  return iconSize;
});
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div
      class="glorious-input"
      :class="[props.icon !== '' ? `icon-${props.size}` : '']"
    >
      <input
        :class="[props.size, `glorious-input-${props.color}`]"
        :placeholder="props.placeholder"
        v-model="inputValue"
        :disabled="props.disabled"
      />

      <GIcon
        class="glorious-input-icon"
        :name="props.icon"
        :size="computeIconSize"
        v-if="props.icon !== ''"
        :color="$tailwindColor('gray', '500')"
      />
    </div>
    <span
      class="text-[12px] text-red-500"
      v-if="gs[error[0]]?.errors[error[1]]"
      >{{ gs[error[0]].errors[error[1]][0] }}</span
    >
  </div>
</template>
