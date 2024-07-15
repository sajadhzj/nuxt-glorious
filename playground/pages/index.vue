<script lang="ts" setup>
import { navigateTo } from "#app";

const gs = GloriousStore();
gs.formCreate("login");
gs.login.form.username = "amirmbagheri";
gs.login.form.password = "سلام1253";
const login = () => {
  useGloriousFetch("user/v1/general/auth/login", {
    gKey: "login",
    body: gs.login.form,
  }).then((data: any) => {
    navigateTo("/dashboard");
  });
};
</script>

<template>
  <div>
    <GInput
      v-model="gs.login.form.username"
      text="شماره موبایل"
      error="login|username"
    />
    <GInput
      v-model="gs.login.form.password"
      text="رمز عبور"
      error="login|password"
    />
    <GButton :loading="gs.login.loading" @click="login()">ورود</GButton>
    <GButton :loading="gs.login.loading" @click="$modal('myd')"
      >open modal</GButton
    >
    <GButton :loading="gs.login.loading" @click="$drawer('drawer')"
      >open drawer</GButton
    >
    <div>{{ gs.login }}</div>

    <GModal id="myd"> sallam </GModal>
    <GDrawer id="drawer"> sallam </GDrawer>
  </div>
</template>
