<script lang="ts" setup>
import { ref, watch } from '#imports'
import _props from '../props/Icon'

const props = defineProps(_props)
const isHover = ref(false)
const icon = ref('')
const computeProps = (icon: any) => {
  const size = props.size
  const color = props.color
  const strokeWidth = props.stroke
  const stroke = props.color

  return icon
    .replace(
      /(?<!stroke-)width="(\d+)"/g,
      `class="g-icon-${props.name}" width="${size}"`
    )
    .replace(/stroke="(?!none)([^"]+)"/g, `stroke="${stroke}"`)
    .replace(/height="(\d+)"/g, `height="${size}"`)
    .replace(/fill="(?!none)([^"]+)"/g, `fill="${color}"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
}
const changeColorIcon = (color: string) => {
  icon.value = icon.value
    .replace(/fill="(?!none)([^"]+)"/g, `fill="${color}"`)
    .replace(/stroke="(?!none)([^"]+)"/g, `stroke="${color}"`)
}
const mouseover = () => {
  if (props.hoverColor === '') return

  if (!isHover.value) {
    const color = props.hoverColor

    changeColorIcon(color)
  }

  isHover.value = true
}
const mouseleave = () => {
  isHover.value = false
  const color = props.color
  changeColorIcon(color)
}
const getIcon = async () => {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      query: '?raw',
      eager: false,
    })

    let rawIcon = ''
    if (typeof iconsImport[`/assets/icons/${props.name}.svg`] !== 'undefined') {
      const icon: any = await iconsImport[`/assets/icons/${props.name}.svg`]()
      rawIcon = icon.default
    } else {
      const staticAssets = import.meta.glob('../../assets/icons/**/**.svg', {
        query: '?raw',
        eager: false,
      })

      const icon: any = await staticAssets[
        `../../assets/icons/${props.name}.svg`
      ]()
      rawIcon = icon.default
    }

    icon.value = computeProps(rawIcon)
  } catch (e) {
    console.error(
      `glorious error -> Icon '${props.name}' doesn't exist in 'assets/icons'`
    )
  }
}

await getIcon()

watch(
  () => props,
  () => getIcon(),
  {
    deep: true,
  }
)
</script>

<template>
  <div
    class="w-max h-max"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    v-html="icon"
  />
</template>
