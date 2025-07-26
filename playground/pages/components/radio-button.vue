<script lang="ts" setup>
import { GRadioButton } from '#components'

const val3 = ref('kmlode')
</script>

<template>
  <div class="flex flex-col gap-3 p-6">
    <GRadioButton
      v-model="val3"
      size="sm"
      name="ms"
      value="kmlode"
    />

    <GRadioButton
      v-model="val3"
      size="md"
      name="ms"
      value="melode"
    />

    <GRadioButton
      v-model="val3"
      size="lg"
      name="ms"
      value="melode2"
      disable
    />
  </div>
</template>
