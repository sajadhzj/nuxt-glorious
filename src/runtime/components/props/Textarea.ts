import {
  color,
  placeholder,
  title,
  size,
  error,
  disabled,
  required,
} from './common'

export default {
  ...color(),
  ...placeholder(),
  ...title(),
  ...size(),
  ...required(),
  ...error,
  ...disabled,
  rows: {
    required: false,
    default: 5,
    type: Number,
  },
}
