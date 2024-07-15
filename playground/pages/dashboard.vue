<template>
  <div>
    <GButton @click="gs.authLogout()">Logout</GButton>
    <GButton to="/">home</GButton>
    <span>{{ gs.auth.user }}</span>
  </div>
</template>

<script lang="ts" setup>
const gs = GloriousStore();
// definePageMeta({
//   middleware: ["g-auth"],
// });
</script>

<style scoped lang="scss"></style>
