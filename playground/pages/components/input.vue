<script lang="ts" setup>
const gs = GloriousStore()
gs.formCreate('d')
gs.forms.d.errors = {
  username: ['this is error'],
}
</script>
<template>
  <div class="p-10 gap-3 flex">
    <GInput
      label="button"
      size="sm"
      icon="glorious-arrow"
      icon-pos="left"
    />

    <GInput
      label="button"
      size="md"
      title="username"
      placeholder="username"
      icon="glorious-arrow"
      error="d|username"
    />

    <GInput
      label="button"
      icon="glorious-arrow"
      size="lg"
    />
  </div>
</template>
