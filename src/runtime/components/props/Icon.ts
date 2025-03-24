import { name, hashColor, intSize, stroke } from './common'

export default {
  ...name,
  ...hashColor,
  ...intSize(),
  ...stroke(),
  hoverColor: {
    required: false,
    default: '',
  },
}
