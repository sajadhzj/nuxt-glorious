<script lang="ts" setup>
const inp = ref(1);
</script>

<template>
  <div>
    <GPaginate v-model="inp" :current-page="1" :last-page="1" />
  </div>
</template>
