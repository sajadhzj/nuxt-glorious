<script setup lang="ts">
import { computed, ref, watch } from "#imports";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: [String, Array<String>],
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
  type: {
    required: false,
    default: "text",
    type: String,
  },
  autocomplete: {
    required: false,
    default: "off",
    type: String,
  },
  mode: {
    required: false,
    default: "normal",
    type: String,
  },
});

const inputValue: any = ref(null);

const emits = defineEmits(["update:modelValue"]);

watch(
  () => inputValue.value,
  () => {
    if (props.mode === "tag") return;
    emits("update:modelValue", inputValue.value);
  }
);

const gs: any = GloriousStore();
const error: any = props.error.split("|");

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

// -------------------------------- TAG
const tags = ref([]);
const addTag = (event: any) => {
  event.preventDefault();
  if (props.mode !== "tag") return;
  tags.value.push(event.target.value);
  emits("update:modelValue", tags.value);
  inputValue.value = "";
};
const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item: any) => item !== tag);
  emits("update:modelValue", tags.value);
};

// -------------------------------------- init value
const initValue = () => {
  if (props.mode === "tag") {
    tags.value = props.modelValue;
    return;
  }

  inputValue.value = props.modelValue;
};
initValue();
watch(
  () => props.modelValue,
  () => initValue()
);
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div
      class="glorious-input"
      :class="[props.icon !== '' ? `icon-${props.size}` : '']"
    >
      <input
        :autocomplete="props.autocomplete"
        :class="[props.size, `glorious-input-${props.color}`]"
        :placeholder="props.placeholder"
        v-model="inputValue"
        :disabled="props.disabled"
        :type="props.type"
        @keypress.enter="addTag($event)"
      />
      <div
        class="flex flex-wrap gap-2 glorious-input-tag"
        v-if="tags.length !== 0"
      >
        <div v-for="(item, index) in tags" :key="index">
          {{ item }}
          <GIcon
            name="glorious-x"
            :size="10"
            color="#ff0000"
            @click="removeTag(item)"
          />
        </div>
      </div>
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
    >
      {{ gs[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>
