<script lang="ts" setup>
import _props from '../props/Avatar'

const props: any = defineProps(_props)
</script>

<template>
  <div
    class="glorious-avatar"
    :class="[`size-${props.size}`, `rounded-${props.rounded}`]"
  >
    <img :src="props.src" />
  </div>
</template>

<style lang="scss" src="../../style/components/avatar.scss" />
