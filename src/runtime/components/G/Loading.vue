<script setup lang="ts">
import _props from '../props/Loading'
const props: any = defineProps(_props)
</script>

<template>
  <div class="inline">
    <div
      class="glorious-loading"
      :style="{
        width: `${props.size}px`,
        border: `${props.stroke}px solid ${props.color}`,
      }"
    />
  </div>
</template>

<style lang="scss" src="../../assets/style/components/loading.scss" />
