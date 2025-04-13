import {
  color,
  placeholder,
  title,
  size,
  error,
  icon,
  disabled,
  options,
  required,
  displayTextKey,
  keyOfValue,
  loading,
  noItemsFound,
} from './common/index'

export default {
  ...color(),
  ...placeholder(),
  ...title(),
  ...size(),
  ...displayTextKey(),
  ...required(),
  ...keyOfValue(),
  ...error,
  ...icon,
  ...disabled,
  ...options,
  ...loading,
  ...noItemsFound(),
  type: {
    required: false,
    default: 'text',
    type: String as () =>
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'email'
      | 'file'
      | 'hidden'
      | 'password'
      | 'radio'
      | 'range'
      | 'tel'
      | 'text'
      | 'url'
      | 'number',
  },
  autocomplete: {
    required: false,
    default: 'off',
    type: String as () => 'off' | 'on' | 'new-password',
  },
  display: {
    required: false,
    default: '',
    type: String as () => 'price',
  },
  inputMode: {
    required: false,
    default: 'text',
    type: String as () =>
      | 'text'
      | 'none'
      | 'decimal'
      | 'numeric'
      | 'tel'
      | 'search'
      | 'email'
      | 'url',
  },
  mode: {
    required: false,
    default: 'normal',
    type: String as () => 'normal' | 'tag',
  },
  tagLockOption: {
    required: false,
    default: false,
    type: Boolean,
  },
}
