import type { colors } from '../../../../types'

export const color = {
  color: {
    required: false,
    default: 'green',
    type: String as () => colors,
  },
}
