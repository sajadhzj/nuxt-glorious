<script setup lang="ts">
import { computed, ref, watch, GloriousStore } from "#imports";
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

// ------------------------------------------------------------------------------------------------ TAG
const tags: any = ref([]);

const addTag = (event: any) => {
  if (tags.value.length === 0) tags.value = [];

  if (props.mode !== "tag") return;
  const value: any = event.target.value;
  tags.value.push(value);
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
        v-model="inputValue"
        :autocomplete="props.autocomplete"
        :class="[props.size, `glorious-input-${props.color}`]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :type="props.type"
        @keyup.enter="addTag($event)"
      />
      <div v-if="tags.length !== 0" class="glorious-input-tag">
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
        v-if="props.icon !== ''"
        class="glorious-input-icon"
        :name="props.icon"
        :size="computeIconSize"
        :color="$tailwindColor('gray', '500')"
      />
    </div>
    <span v-if="gs[error[0]]?.errors[error[1]]" class="glorious-error-text">
      {{ gs[error[0]].errors[error[1]][0] }}
    </span>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/input.scss";
</style>
