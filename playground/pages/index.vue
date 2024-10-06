<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-5">
    {{ tailwindColor("green", 500) }}
    <GButton @click="modal()">drawer</GButton>

    <GModal title="=moz"></GModal>
  </div>
</template>
