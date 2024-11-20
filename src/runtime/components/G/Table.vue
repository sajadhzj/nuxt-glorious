<script lang="ts" setup>
const props = defineProps({
  color: {
    required: false,
    default: 'blue',
    type: String as () => 'orange' | 'blue' | 'gray' | 'red' | 'green',
  },
  header: {
    required: true,
    type: Object,
  },
  body: {
    required: true,
    type: Array<Object>,
    default: [],
  },
  loading: {
    required: false,
    default: false,
    type: Boolean,
  },
  loadingOption: {
    required: false,
    default: {
      color: 'green',
    },
    type: {
      color: String,
    },
  },
})
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
  </div>
</template>

<style lang="scss">
@import '../../assets/style/components/table.scss';
</style>
