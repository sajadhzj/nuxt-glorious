<template>
  <div>
    <GButton>Logout</GButton>
    <GButton to="/login">home</GButton>
    <span>{{ gs.auth.user }}</span>
  </div>
</template>

<script lang="ts" setup>
const gs = GloriousStore();
gs.formCreate("mxseder");
</script>

<style scoped lang="scss"></style>
