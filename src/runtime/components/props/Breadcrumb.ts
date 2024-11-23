import type { breadcrumbInterface } from '../../../types'
export default {
  items: {
    required: true,
    type: Array<breadcrumbInterface>,
  },
  divider: {
    required: false,
    type: String,
    default: '/',
  },
}
