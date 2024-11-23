import {
  options,
  color,
  size,
  title,
  error,
  disabled,
  placeholder,
} from './common'

export default {
  ...size(),
  ...title(),
  ...placeholder(),
  ...color(),
  ...error,
  ...disabled,
  ...options,
  displayTextKey: {
    required: false,
    default: 'text',
    type: String,
  },
}
