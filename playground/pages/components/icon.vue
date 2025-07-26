<script lang="ts" setup>
const gs = GloriousStore()
</script>

<template>
  <div>
    {{ gs.tc('primary-500') }}
    <GIcon
      name="glorious-arrow"
      :color="gs.tc('primary-500')"
    />
  </div>
</template>
