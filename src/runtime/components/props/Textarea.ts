import { color, placeholder, title, error, disabled, required } from './common'

export default {
  ...color(),
  ...placeholder(),
  ...title(),
  ...required(),
  ...error,
  ...disabled,
  rows: {
    required: false,
    default: 5,
    type: Number,
  },
}
