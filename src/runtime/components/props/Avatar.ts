import { size, rounded } from './common'

export default {
  ...size(),
  ...rounded,
  src: {
    required: true,
    type: String,
  },
}
