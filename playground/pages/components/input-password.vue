<script lang="ts" setup>
const gs = GloriousStore()
gs.formCreate('d')
gs.forms.d.errors = {
  username: ['this is error'],
}
</script>
<template>
  <div class="p-10 gap-3 flex">
    <GInputPassword />
  </div>
</template>
