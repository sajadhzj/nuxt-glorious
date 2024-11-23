import { color, size, disabled, loading, to, ariaLabel } from './common'

export default {
  ...color,
  ...size(),
  ...disabled,
  ...loading,
  ...to,
  ...ariaLabel,
  outline: {
    required: false,
    default: false,
    type: Boolean,
  },
}
