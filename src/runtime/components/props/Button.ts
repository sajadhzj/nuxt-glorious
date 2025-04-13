import {
  color,
  size,
  disabled,
  loading,
  loadingColor,
  to,
  ariaLabel,
  outline,
} from './common'

export default {
  ...color(),
  ...size(),
  ...disabled,
  ...loading,
  ...loadingColor,
  ...to,
  ...ariaLabel,
  ...outline(),
}
