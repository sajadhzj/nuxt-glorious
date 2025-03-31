<script lang="ts" setup>
import _props from '../props/Table'
import { getAttribute } from '../helper'

const props = defineProps(_props)
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col">
      <div
        class="glorious-table"
        :class="[`color-${getAttribute(props.color, 'table', 'color')}`]"
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
          <tbody v-if="!getAttribute(props.loading, 'table', 'loading')">
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
        v-if="getAttribute(props.loading, 'table', 'loading')"
        class="flex justify-center mt-3"
      >
        <GLoading
          :color="getAttribute(props.loadingColor, 'table', 'loadingColor')"
        />
      </div>
      <div
        class="flex justify-center mt-3"
        v-if="
          !getAttribute(props.loading, 'table', 'loading') &&
          props.body.length === 0
        "
      >
        <div class="bg-white shadow p-2 rounded w-max">
          <span>
            {{ getAttribute(props.emptyText, 'table', 'emptyText') }}
          </span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
