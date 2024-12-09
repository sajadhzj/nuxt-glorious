import {
  options,
  color,
  size,
  title,
  error,
  disabled,
  placeholder,
  required,
} from './common'

export default {
  ...size(),
  ...title(),
  ...placeholder(),
  ...color(),
  ...required(),
  ...error,
  ...disabled,
  ...options,
  displayTextKey: {
    required: false,
    default: 'text',
    type: String,
  },
}
