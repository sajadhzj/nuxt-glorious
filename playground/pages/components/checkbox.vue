<script lang="ts" setup>
const value = ref(false)

function log() {
  console.log(value.value)
}
</script>
<template>
  <div class="p-10">
    <GCheckbox
      color="red"
      label="سلام"
    />

    <hr class="my-10" />

    <GCheckbox
      size="lg"
      label="سلام به تو"
    />
    <hr class="my-10" />

    <GCheckbox
      size="lg"
      checked
      :disabled="true"
    />

    <GCheckbox
      size="md"
      checked
      :disabled="true"
    />
    <GCheckbox
      size="sm"
      checked
      :disabled="true"
    />
  </div>
</template>
