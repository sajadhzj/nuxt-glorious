<script lang="ts" setup>
import _props from './../props/Accordion'
import { getAttribute } from '../helper'

const props = defineProps(_props)
const openAccordion = (e: Event) => {
  const headerElement = e.currentTarget as HTMLElement
  const bodyElement = headerElement.nextElementSibling as HTMLElement
  if (bodyElement.style.maxHeight) {
    headerElement.classList.remove('accordion-open')
    bodyElement.style.removeProperty('max-height')
  } else {
    headerElement.classList.add('accordion-open')
    bodyElement.style.maxHeight = bodyElement.scrollHeight + 24 + 'px'
  }
}
</script>

<template>
  <div
    class="glorious-accordion"
    :class="`color-${getAttribute(props.color, 'accordion', 'color')}`"
  >
    <div
      class="header"
      @click="openAccordion"
    >
      <div>
        <slot name="header" />
      </div>
      <GIcon
        name="glorious-arrow"
        :size="10"
      />
    </div>
    <div class="body">
      <slot name="body" />
    </div>
  </div>
</template>
