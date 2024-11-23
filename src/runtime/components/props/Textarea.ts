import { color, placeholder, title, size, error, disabled } from './common'

export default {
  ...color(),
  ...placeholder(),
  ...title(),
  ...size(),
  ...error,
  ...disabled,
  rows: {
    required: false,
    default: 5,
    type: Number,
  },
}
