<template>
  <div>
    <GIcon name="alarm-line" :size="50" :color="color" @click="changeColor" />
  </div>
</template>

<script lang="ts" setup>
const color = ref("#ff0000");
const changeColor = () => {
  if (color.value === "#ff0000") {
    color.value = "#00ff00";
  } else {
    color.value = "#ff0000";
  }
  console.log(color.value);
};
</script>

<style scoped></style>
