<script lang="ts" setup>
const gs = GloriousStore();
gs.formCreate("login");
const login = () => {
  useGloriousFetch("/auth/login", {
    gKey: "login",
    body: gs.login.form,
  }).then((data: any) => gs.authSetToken(data.data.token, "/dashboard"));
};
</script>
<template>
  <div class="flex flex-col w-full h-full justify-center items-center px-3">
    {{ gs.authIsLogin }}
    <form
      @submit.prevent="login"
      class="bg-white shadow-md gap-3 flex flex-col w-[300px] mx-3 p-3 top-[30%] absolute border border-green-100 rounded-md"
    >
      <h1>ورود به ناحیه کاربری</h1>
      <hr />
      <GInput
        error="login|username"
        placeholder="نام کاربری"
        title="نام کاربری"
        v-model="gs.login.form.username"
      />
      <GInput
        error="login|password"
        placeholder="رمز عبور"
        title="رمز عبور"
        type="password"
        v-model="gs.login.form.password"
      />
      <GButton :loading="gs.loading.login"> ورود </GButton>
      <GButton :loading="gs.loading.login" to="/dashboard"> داشبورد </GButton>
    </form>
  </div>
</template>
