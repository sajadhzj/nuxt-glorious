<script lang="ts" setup>
import _props from '../props/Tab'

const props: any = defineProps(_props)
const modelValue = defineModel()
const tabClicked: any = (key: string, event: any) => {
  modelValue.value = key
  Array.from(event.currentTarget.parentElement.parentElement.children).map(
    (item: any) => item.children[0].classList.remove('active')
  )
  event.currentTarget.classList.add('active')
}

const setArrow = () => {
  document.querySelectorAll('.glorious-tab-content').forEach((element) => {
    if (element.scrollWidth > element.clientWidth) {
      element.previousElementSibling?.classList.replace('hidden', 'flex')

      element.previousElementSibling?.parentElement?.classList.add('!px-7')
      element.nextElementSibling?.classList.replace('hidden', 'flex')
    } else {
      element.previousElementSibling?.classList.add('hidden')
      element.previousElementSibling?.parentElement?.classList.remove('!px-7')
      element.nextElementSibling?.classList.add('hidden')
    }
  })
}
onMounted(() => {
  window.addEventListener('resize', () => setArrow())
  setArrow()
})

const scrollNext = (event: Event) => {
  const currentTarget = event.currentTarget as HTMLDivElement
  const nextElement = currentTarget.nextElementSibling as HTMLDivElement
  nextElement.scrollBy({
    left: 80,
    behavior: 'smooth',
  })
}
const scrollPrevious = (event: Event) => {
  const currentTarget = event.currentTarget as HTMLDivElement
  const previousElement = currentTarget.previousElementSibling as HTMLDivElement
  previousElement.scrollBy({
    left: -80,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="glorious-tab relative">
    <div
      @click="scrollNext($event)"
      class="bg-green-700 absolute right-0 h-full top-0 w-8 justify-center items-center rounded-r-lg hidden cursor-pointer"
    >
      <GIcon
        name="glorious-arrow"
        :size="15"
        color="#fff"
      />
    </div>

    <div class="flex overflow-auto px-3 py-2 gap-3 glorious-tab-content">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="flex justify-center tab-item"
        :style="{ flexBasis: `${100 / props.items.length}%` }"
      >
        <button
          :class="item.active ? `active` : ''"
          @click="tabClicked(item.key, $event)"
        >
          {{ item.text }}
        </button>
      </div>
    </div>

    <div
      @click="scrollPrevious($event)"
      class="bg-green-700 absolute left-0 h-full top-0 w-8 justify-center items-center rounded-l-lg hidden cursor-pointer"
    >
      <GIcon
        name="glorious-arrow"
        class="rotate-180"
        :size="15"
        color="#fff"
      />
    </div>
  </div>
</template>
