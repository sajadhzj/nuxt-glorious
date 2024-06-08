<template>
  <div>
    <GPaginate v-model="p" :data="data" />
  </div>
</template>

<script lang="ts" setup>
const p = ref(1);
watch(
  () => p.value,
  () => {
    console.log(p.value);
  },
  { deep: true }
);
const data = {
  current_page: 1,
  from: 1,
  last_page: 3,
  links: [
    {
      url: null,
      label: "&laquo; Previous",
      active: false,
    },
    {
      url: "http://localhost:8000/api/admin/users?page=1",
      label: "1",
      active: true,
    },
    {
      url: "http://localhost:8000/api/admin/users?page=2",
      label: "2",
      active: false,
    },
    {
      url: "http://localhost:8000/api/admin/users?page=3",
      label: "3",
      active: false,
    },
    {
      url: "http://localhost:8000/api/admin/users?page=2",
      label: "Next &raquo;",
      active: false,
    },
  ],
  path: "http://localhost:8000/api/admin/users",
  per_page: 9,
  to: 9,
  total: 22,
};
</script>

<style scoped></style>
