<script lang="ts" setup>
const gs = GloriousStore();
gs.formCreate("ds");
</script>

<template>
  <div>
    <GButton to="/dashboard"> ssd </GButton>
    {{ gs }}
  </div>
</template>
