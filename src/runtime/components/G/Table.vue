<script lang="ts" setup>
import _props from '../props/Table'
const props = defineProps(_props)
</script>

<template>
  <div class="flex flex-col">
    <div
      class="glorious-table"
      :class="[`color-${props.color}`]"
    >
      <table>
        <thead>
          <tr>
            <th
              v-for="(headItem, index) in props.header"
              :key="index"
            >
              {{ headItem }}
            </th>
          </tr>
        </thead>
        <tbody v-if="!props.loading">
          <tr
            v-for="(bodyItem, bodyIndex) in props.body"
            :key="bodyIndex"
          >
            <td
              v-for="(headItem, headKey, headIndex) in props.header"
              :key="headIndex"
            >
              <slot
                v-if="typeof $slots[headKey] !== 'undefined'"
                :name="headKey"
                :item="{ ...bodyItem, index: bodyIndex }"
              />
              <template v-else>
                {{ bodyItem[headKey] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="props.loading"
      class="flex justify-center mt-3"
    >
      <GLoading :color="props.loadingOption.color" />
    </div>
    <div
      class="flex justify-center mt-3"
      v-if="!props.loading && props.body.length === 0"
    >
      <div class="bg-white shadow p-2 rounded w-max">
        <span> {{ props.emptyText }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../../style/components/table.scss" />
