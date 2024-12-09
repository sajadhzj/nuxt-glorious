<script lang="ts" setup>
import { GloriousStore } from '../../stores/GloriousStore'
import _props from '../props/ErrorText'

const props = defineProps(_props)
const gs = GloriousStore()
const error: any = props.error.split('|')
</script>
<template>
  <span
    v-if="gs.forms[error[0]]?.errors[error[1]]"
    class="validation-error-text text-red-500 text-sm"
  >
    {{ gs.forms[error[0]].errors[error[1]][0] }}
  </span>
</template>
