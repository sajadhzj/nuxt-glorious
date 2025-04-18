<script lang="ts" setup>
import { GloriousStore } from '../../stores/GloriousStore'
import _props from '../props/ErrorText'

const props = defineProps(_props)
const gs = GloriousStore()
const error: any = props.error.split('|')
const isAll = () => error.length === 1
</script>
<template>
  <div>
    <span
      v-if="gs.forms[error[0]]?.errors[error[1]] && !isAll()"
      class="validation-error-text text-red-500 text-sm"
    >
      {{ gs.forms[error[0]].errors[error[1]][0] }}
    </span>
    <ul
      v-else-if="isAll()"
      class="flex flex-col list-disc ltr:ml-4 rtl:mr-4"
    >
      <li
        v-for="(item, index) in gs.forms[error[0]].errors"
        :key="index"
        class="validation-error-text text-red-500 text-sm"
      >
        {{ item[0] }}
      </li>
    </ul>
  </div>
</template>
