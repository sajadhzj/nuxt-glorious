<script lang="ts" setup>
import { useGloriousFetch } from "#imports";

const gs = GloriousStore();
gs.formCreate("ds");

const upload = () => {
  useGloriousFetch("/mox", {
    method: "POST",
    bodyType: "formData",
    body: {
      ds: 1,
    },
  });
};
const uploadFile = (event) => {
  const form = new FormData();
  form.append("s", "mox");
  useGloriousFetch("/mox", {
    method: "POST",
    body: { ref: 6 },
  });
};
</script>

<template>
  <div>
    <GButton @click="upload"> ssd </GButton>
    <input type="file" @change="uploadFile($event)" />
  </div>
</template>
