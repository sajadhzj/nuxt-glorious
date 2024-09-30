<script lang="ts" setup>
import { watch, onMounted } from "#imports";
const props = defineProps({
  items: {
    required: true,
    type: Object,
  },
  step: {
    required: true,
    type: Number,
    default: 1,
  },
  progressColor: {
    required: false,
    default: "#00ff00",
    type: String,
  },
  bgColor: {
    required: false,
    default: "#0000ff",
    type: String,
  },
});

const methods = {
  computeWizardMobile: () => {
    const circularProgress = document.querySelectorAll(".circular-progress");
    Array.from(circularProgress).forEach((progressBar: any) => {
      const progressValue: any = progressBar.querySelector(".percentage");
      const innerCircle: any = progressBar.querySelector(".inner-circle");
      const eachStep = (1 / props.items.length) * 100;

      let startValue =
        Number(progressBar.getAttribute("data-percentage")) - eachStep < 0
          ? 0
          : Number(progressBar.getAttribute("data-percentage"));

      const endValue: any =
          props.step === 0
            ? 0
            : Number(progressBar.getAttribute("data-percentage")) + eachStep,
        progressColor = progressBar.getAttribute("data-progress-color");

      const progress = setInterval(() => {
        progressValue.textContent = props.step + 1;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
          "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${
          startValue * 3.6
        }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;

        if (Math.floor(startValue) == Math.floor(endValue))
          clearInterval(progress);

        startValue++;
      }, 10);
    });
  },
};

onMounted(() => methods.computeWizardMobile());

watch(
  () => props.step,
  () => methods.computeWizardMobile()
);
</script>

<template>
  <div class="glorious-wizard">
    <div class="glorious-wizard-desktop">
      <div v-for="(item, index) in props.items" :key="index">
        <div
          class="circle"
          :class="parseInt(index) < props.step ? 'checked' : ''"
        >
          <GIcon
            v-if="parseInt(index) < props.step"
            name="glorious-check-fill"
            color="#ffffff"
          />

          <span v-else>{{ index }}</span>
        </div>
        <span class="text-[14px] font-medium">{{ item }}</span>
      </div>
    </div>
    <div class="glorious-wizard-mobile">
      <div
        class="circular-progress"
        :style="{ width: '48px', height: '48px' }"
        :data-percentage="(props.step / props.items.length) * 100"
        :data-progress-color="props.progressColor"
        :data-bg-color="props.bgColor"
      >
        <div
          class="inner-circle"
          :class="[props.step === props.items.length ? 'checked' : '']"
          :style="{ width: '44px', height: '44px' }"
        />
        <p
          v-show="props.step !== props.items.length"
          class="percentage text-blue-500"
        >
          {{ props.step + 1 }}
        </p>
        <GIcon
          v-show="props.step === props.items.length"
          name="glorious-check-fill"
          color="#ffffff"
        />
      </div>
      <span>{{ props.items[props.step] }}</span>
    </div>
  </div>
</template>

<style scoped>
.glorious-wizard {
  @apply md:w-full w-max;
}
.glorious-wizard-desktop {
  @apply md:flex hidden flex-wrap gap-[3%] w-full justify-center;
}
.glorious-wizard-desktop div {
  @apply flex flex-col items-center;
}
.glorious-wizard-desktop > div > div.circle {
  @apply rounded-full border border-blue-200 w-12 h-12 flex justify-center items-center;
}
.glorious-wizard-desktop > div > div.circle.checked {
  @apply border-green-500 bg-green-500;
}
.glorious-wizard-mobile {
  @apply w-max md:hidden flex flex-col items-center;
}
.glorious-wizard-mobile > span {
  @apply text-gray-500 text-[12px];
}
.circular-progress {
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
}
.circular-progress p,
.circular-progress > div {
  @apply z-[25] text-gray-500;
}
.inner-circle {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
}
.inner-circle.checked {
  @apply bg-green-500;
}
.percentage {
  font-size: 1rem;
  position: relative;
}
</style>
