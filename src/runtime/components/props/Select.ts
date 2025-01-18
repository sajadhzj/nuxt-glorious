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
  keyOfValue,
} from './common'

export default {
  ...size(),
  ...title(),
  ...placeholder(),
  ...color(),
  ...required(),
  ...displayTextKey(),
  ...keyOfValue(),
  ...error,
  ...disabled,
  ...options,
}
