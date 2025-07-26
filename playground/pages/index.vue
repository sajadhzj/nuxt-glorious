<script lang="ts" setup>
const gs = GloriousStore()
onMounted(() => {
  const body = document.querySelector('body')

  const toastElement = document.createElement('div') as HTMLElement
})
</script>
<template>
  <div>
    <h1 class="text-5xl font-bold underline cm">Hello world!</h1>
    {{ gs.tc('primary-200') }}
  </div>
</template>
