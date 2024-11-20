<script lang="ts" setup>
import _props from './../props/Alert'

const props = defineProps(_props)
</script>

<template>
  <div
    class="glorious-alert"
    :class="[`color-${props.color}`]"
  >
    <slot />
  </div>
</template>

<style lang="scss" src="../../assets/style/components/alert.scss" />
