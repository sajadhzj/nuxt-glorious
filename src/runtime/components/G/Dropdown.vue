<script lang="ts" setup>
import { onMounted } from "#imports";

const props = defineProps({
  icon: {
    required: false,
    default: "",
    type: String,
  },
});

const openDropdown = (event: any) =>
  event.currentTarget.parentElement.parentElement.classList.toggle("open");

onMounted(() => {
  window.onclick = (event: any) => {
    if (!event.target.matches(".glorious-dropdown-button")) {
      const allDropdown = document.querySelectorAll(".glorious-dropdown");
      allDropdown.forEach((item: any) => {
        item.classList.remove("open");
      });
    }
  };
});
</script>
<template>
  <div class="glorious-dropdown">
    <div>
      <button
        aria-label="dots"
        class="glorious-dropdown-button"
        @click.prevent="openDropdown($event)"
      >
        &nbsp;
      </button>
      <GIcon :name="props.icon" color="#000" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/components/dropdown.scss";
</style>
