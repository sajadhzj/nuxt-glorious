<script lang="ts" setup>
import { onMounted, ref, useId, useSlots } from '#imports'
import _props from '../props/CountDown'

const isEnd = ref<Boolean>(false)
const props = defineProps(_props)
const slot = useSlots()
const id = useId()

onMounted(() => {
  let second = <number>props.second
  const countInterval = setInterval(() => {
    try {
      second--
      let timeString = ''

      if (<number>props.second <= 60)
        timeString =
          '00:' + (second.toString().length === 1 ? '0' + second : second)
      else {
        let minute: number | string = Math.floor(second / 60)
        if (minute >= 1) {
          const computeSecond = second - minute * 60
          const computeSecond2 =
            computeSecond.toString().length === 1
              ? '0' + computeSecond
              : computeSecond
          minute = minute.toString().length === 1 ? '0' + minute : minute
          timeString = minute + ':' + computeSecond2
        } else {
          timeString =
            '00:' + (second.toString().length === 1 ? '0' + second : second)
        }
      }

      const countDownElement: any = document.getElementById('countDown' + id)
      countDownElement.innerText = timeString

      if (second === 0) {
        isEnd.value = true
        clearInterval(countInterval)
      }
    } catch (e) {
      clearInterval(countInterval)
    }
  }, 1000)
})
</script>
<template>
  <div class="glorious-count-down">
    <span v-if="isEnd && typeof slot.end === 'undefined'"> 00:00 </span>
    <slot
      v-if="isEnd"
      name="end"
    />
    <div v-else>
      <slot name="one"></slot>
      <div :id="`countDown` + id" />
      <slot name="two"></slot>
    </div>
  </div>
</template>
