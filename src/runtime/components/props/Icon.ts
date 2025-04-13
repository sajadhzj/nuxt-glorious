import { name, hashColor, intSize, stroke, hoverColor } from './common'

export default {
  ...name,
  ...hashColor,
  ...intSize(),
  ...stroke(),
  ...hoverColor(),
}
