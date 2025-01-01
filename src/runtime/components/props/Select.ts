import {
  options,
  color,
  size,
  title,
  error,
  disabled,
  placeholder,
  required,
  displayTextKey,
} from './common'

export default {
  ...size(),
  ...title(),
  ...placeholder(),
  ...color(),
  ...required(),
  ...displayTextKey(),
  ...error,
  ...disabled,
  ...options,
}
