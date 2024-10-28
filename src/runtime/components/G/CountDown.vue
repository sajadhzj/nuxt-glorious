<script lang="ts" setup>
import { onMounted, ref, useId, useSlots } from "#imports";

const isEnd = ref<Boolean>(false);
const props = defineProps({
  second: {
    required: true,
    type: Number,
  },
  className: {
    required: true,
    type: String,
    default: "flex text-gray-500 font-medium",
  },
});
const slot = useSlots();
const id = useId();
onMounted(() => {
  const currentSecond = props.second;
  let second = props.second;
  const countInterval = setInterval(() => {
    try {
      second--;
      let timeString = "";

      if (currentSecond <= 60)
        timeString =
          "00:" + (second.toString().length === 1 ? "0" + second : second);
      else {
        let minute: number | string = Math.floor(second / 60);
        if (minute >= 1) {
          const computeSecond = second - minute * 60;
          const computeSecond2 =
            computeSecond.toString().length === 1
              ? "0" + computeSecond
              : computeSecond;
          minute = minute.toString().length === 1 ? "0" + minute : minute;
          timeString = minute + ":" + computeSecond2;
        } else {
          timeString =
            "00:" + (second.toString().length === 1 ? "0" + second : second);
        }
      }

      const countDownElement: any = document.getElementById("countDown" + id);
      countDownElement.innerText = timeString;

      if (second === 0) {
        isEnd.value = true;
        clearInterval(countInterval);
      }
    } catch (e) {
      clearInterval(countInterval);
    }
  }, 1000);
});
</script>
<template>
  <div>
    <span
      v-if="isEnd && typeof slot.end === 'undefined'"
      :class="props.className"
    >
      00:00
    </span>
    <slot v-if="isEnd" name="end" />
    <div v-else :class="props.className">
      <slot name="one"></slot>
      <div :id="`countDown` + id" />
      <slot name="two"></slot>
    </div>
  </div>
</template>
