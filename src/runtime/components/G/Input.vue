<script setup lang="ts">
import { computed, ref, watch } from "#imports";
import { useGloriousCore } from "../../composables/useGloriousCore";
import gTailwindColor from "../../utils/gTailwindColor";
const props = defineProps({
  modelValue: {
    required: false,
    default: "",
    type: [String, Array<String>, Number],
  },
  color: {
    required: false,
    default: "primary",
    type: String as () => "orange" | "blue" | "gray" | "red" | "primary",
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
    type: String as () => "xl" | "lg" | "md" | "sm" | "xsm",
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
    type: String as () =>
      | "button"
      | "checkbox"
      | "color"
      | "date"
      | "email"
      | "file"
      | "hidden"
      | "password"
      | "radio"
      | "range"
      | "tel"
      | "text"
      | "url"
      | "number",
  },
  autocomplete: {
    required: false,
    default: "off",
    type: String as () => "off" | "on" | "new-password",
  },
  mode: {
    required: false,
    default: "normal",
    type: String as () => "normal" | "tag",
  },
  display: {
    required: false,
    default: "",
    type: String as () => "price",
  },
  inputMode: {
    required: false,
    default: "text",
    type: String as () =>
      | "text"
      | "none"
      | "decimal"
      | "numeric"
      | "tel"
      | "search"
      | "email"
      | "url",
  },
});

const inputValue: any = ref(null);

const emits = defineEmits(["update:modelValue"]);

watch(
  () => inputValue.value,
  () => {
    if (props.mode === "tag") return;

    switch (props.display) {
      case "price":
        inputValue.value = useGloriousCore.numbersWithSeperateSamePrice(
          inputValue.value
        );
        emits(
          "update:modelValue",
          inputValue.value.toString().replaceAll(",", "")
        );
        break;
      default:
        emits("update:modelValue", inputValue.value);
        break;
    }
  }
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

const typeInput = ref(props.type);
</script>

<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-medium text-gray-500">{{ props.title }}</span>
    <div
      class="glorious-input"
      :class="[props.icon !== '' ? `icon-${props.size}` : '']"
    >
      <div class="relative">
        <input
          v-model="inputValue"
          :inputmode="props.inputMode"
          :autocomplete="props.autocomplete"
          class="w-full"
          :class="[
            props.size,
            `glorious-input-${props.color}`,
            props.type === 'password' ? 'pl-[30px] pr-3' : 'px-3',
          ]"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :type="typeInput"
          @keyup.enter="addTag($event)"
        />
        <GIcon
          v-if="props.type === 'password' && typeInput === 'password'"
          class="absolute left-0 top-0 bottom-0 my-auto ml-1 cursor-pointer"
          :size="23"
          name="glorious-eye-fill"
          :color="gTailwindColor('gray', 500)"
          @click="typeInput = 'text'"
        ></GIcon>
        <GIcon
          v-if="props.type === 'password' && typeInput === 'text'"
          class="absolute left-0 top-0 bottom-0 my-auto ml-1 cursor-pointer"
          :size="23"
          name="glorious-eye-off-fill"
          :color="gTailwindColor('gray', 500)"
          @click="typeInput = 'password'"
        ></GIcon>
      </div>
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
        :color="gTailwindColor('gray', '500')"
      />
    </div>
    <GErrorText :error="props.error" />
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/input.scss";
</style>
