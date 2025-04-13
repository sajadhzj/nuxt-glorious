import { size, title, color } from './common'

export default {
  ...size(),
  ...title(),
  okBtn: {
    required: false,
    default: '',
    type: String,
  },
  okBtnLoading: {
    required: false,
    default: false,
    type: Boolean,
  },
  closeBtn: {
    required: false,
    default: '',
    type: String,
  },
  blur: {
    required: false,
    default: true,
    type: Boolean,
  },
  blurClose: {
    required: false,
    default: true,
    type: Boolean,
  },
  colorBtn: {
    ...color().color,
  },
}
