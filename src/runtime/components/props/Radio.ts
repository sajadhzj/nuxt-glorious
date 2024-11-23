import { color, size, disabled, name, checked, value } from './common'

export default {
  ...disabled,
  ...name,
  ...checked,
  ...color(),
  ...value(),
  ...size(),
}
