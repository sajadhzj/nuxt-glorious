<script lang="ts" setup>
import { useGloriousFetch } from "#imports";

const gs = GloriousStore();
gs.formCreate("test");
gs.forms.test.errors.input = ["مشکل پیش امده"];

const drawer = () => {
  useGloriousFetch("http://127.0.0.1:8000/api/notifications", {
    body: {
      user_id: 1,
    },
  });
};
</script>
<template>
  <div class="flex flex-col gap-5">
    <GTextarea
      v-model="gs.forms.test.form.description"
      error="test|input"
      type="password"
    ></GTextarea>

    <GSelect
      placeholder="سلام"
      :options="[
        { text: 1, value: 1 },
        { text: 1, value: 1 },
        { text: 1, value: 1 },
      ]"
    ></GSelect>

    <GCountDown :second="5" />
    <GCountDown :second="5">
      <template #end>sa</template>
    </GCountDown>

    {{ gs.forms.test.form }}
    <GButton @click="drawer">drawer</GButton>
    <GDrawer dir="ltr">ds</GDrawer>
    <GFile />

    <GPaginate :currentPage="1" :lastPage="2" />
  </div>
</template>
