<script lang="ts" setup>
type simpleTableInterface = {
  head: Array<String>;
  body: Array<any>;
};

const props = defineProps({
  color: {
    required: false,
    default: "blue",
    type: String as () => "orange" | "blue" | "gray" | "red" | "green",
  },
  table: {
    required: true,
    type: Object as () => simpleTableInterface,
  },
});
</script>

<template>
  <div class="glorious-simple-table" :class="[`color-${props.color}`]">
    <table>
      <thead>
        <tr>
          <th v-for="(headItem, index) in props.table.head" :key="index">
            {{ headItem }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodyItem, index) in props.table.body" :key="index">
          <td v-for="(bodyRecord, rIndex) in bodyItem" :key="rIndex">
            {{ bodyRecord }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/simple-table.scss";
</style>
