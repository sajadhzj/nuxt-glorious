<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import useGloriousFetch from "../../src/runtime/composables/useGloriousFetch";

onMounted(() => {
  setTimeout(()=>{
    console.log('fire')
    useGloriousFetch('https://api.sajad-hzj.ir/api/skills?type=1&page=1')
  } , 1000)
})
</script>

<style scoped lang="scss">

</style>
