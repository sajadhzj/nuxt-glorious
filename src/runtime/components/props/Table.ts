import { color, loading } from './common'

export default {
  ...color(),
  ...loading,
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
