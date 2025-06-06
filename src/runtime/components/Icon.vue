<script lang="ts" setup>
import { ref, watch } from '#imports'

interface iconPropInterface {
  name: String
  color?: String
  hoverColor?: String
  size?: Number
  strokeWidth?: Number
}

const props: any = withDefaults(defineProps<iconPropInterface>(), {
  size: 20,
  color: '#000',
  strokeWidth: 3,
})

const isHover = ref(false)
const icon = ref('')
const computeSize = (size: number | string): number => {
  let result: number = 0

  switch (size) {
    case 'sm':
      result = 13
      break
    case 'md':
      result = 15
      break
    case 'lg':
      result = 16
      break
    default:
      result = <number>size
      break
  }

  return result
}
const computeProps = (icon: any) => {
  const size = computeSize(props.size)
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
      const staticAssets = import.meta.glob('../assets/icons/**/**.svg', {
        query: '?raw',
        eager: false,
      })
      const icon: any = await staticAssets[
        `../assets/icons/${props.name}.svg`
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
    class="w-max h-max g-icon"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    v-html="icon"
  />
</template>
