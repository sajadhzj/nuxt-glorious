<script lang="ts" setup>
import { ref, watch } from "#imports";

const props = defineProps({
  name: {
    required: true,
    type: String,
    default: "",
  },
  color: {
    required: false,
    type: String,
    default: "#000",
  },
  size: {
    required: false,
    type: Number,
    default: 20,
  },
  stroke: {
    required: false,
    type: Number,
    default: 1,
  },
});

const icon = ref("");

const methods = {
  computeProps: (icon: any) => {
    //color
    icon = icon.replaceAll("\n", " ");
    //stroke
    icon = icon
      .split(" ")
      .map((item: any) =>
        item.includes('stroke="') && typeof props.color !== "undefined"
          ? 'stroke="' + props.color + '"'
          : item
      )
      .join(" ");

    //fill
    if (typeof props.color !== "undefined") {
      icon = icon
        .split(" ")
        .map((item: any) => {
          if (!item.includes('fill="none"')) {
            if (item.includes('fill="') && !item.includes('"/>'))
              return `fill="${props.color}"`;
            else if (item.includes('fill="') && item.includes('"/>'))
              return `fill="${props.color}"/>`;
            else return item;
          } else return item;
        })
        .join(" ");
    }

    //size
    icon = icon.replaceAll("\n", " ");

    //width
    icon = icon
      .split(" ")
      .map((item: any) =>
        item.includes('width="') &&
        !item.includes("stroke-width") &&
        typeof props.size !== "undefined"
          ? 'width="' + props.size + '"'
          : item
      )
      .join(" ");

    icon = icon
      .split(" ")
      .map((item: any) =>
        item.includes('height="') && typeof props.size !== "undefined"
          ? 'height="' + props.size + '"'
          : item
      )
      .join(" ");

    //stroke
    icon = icon.replaceAll("\n", " ");

    icon = icon
      .split(" ")
      .map((item: any) =>
        item.includes("stroke-width") && typeof props.stroke !== "undefined"
          ? 'stroke-width="' + props.stroke + '"'
          : item
      )
      .join(" ");

    return icon;
  },
};

async function getIcon() {
  try {
    const iconsImport = import.meta.glob("assets/icons/**/**.svg", {
      query: "?raw",
      eager: false,
    });
    let rawIcon = "";
    if (typeof iconsImport[`/assets/icons/${props.name}.svg`] !== "undefined") {
      const icon: any = await iconsImport[`/assets/icons/${props.name}.svg`]();
      rawIcon = icon.default;
    } else {
      const staticAssets = import.meta.glob("../../../assets/icons/**/**.svg", {
        query: "?raw",
        eager: false,
      });

      const icon: any = await staticAssets[
        `../../../assets/icons/${props.name}.svg`
      ]();
      rawIcon = icon.default;
    }

    icon.value = methods.computeProps(rawIcon);
  } catch (e) {
    console.error(
      `glorious error -> Icon '${props.name}' doesn't exist in 'assets/icons'`
    );
  }
}

await getIcon();

watch(
  () => props,
  () => getIcon(),
  {
    deep: true,
  }
);
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="w-max h-max" v-html="icon" />
</template>
