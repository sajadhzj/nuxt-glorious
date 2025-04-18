import { color, loading, loadingColor } from './common'

export default {
  ...color(),
  ...loading,
  ...loadingColor,
  header: {
    required: true,
    type: Object,
  },
  body: {
    required: true,
    type: Array<Object>,
    default: [],
  },
  emptyText: {
    required: false,
    default: '! no record found',
    type: String,
  },
}
