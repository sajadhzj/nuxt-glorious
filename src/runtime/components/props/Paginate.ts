import { color } from './common/index'
export default {
  ...color(),
  currentPage: {
    required: true,
    type: Number,
    default: 1,
  },
  lastPage: {
    required: true,
    type: Number,
    default: 1,
  },
  numberSuggestPage: {
    required: false,
    type: Number,
    default: 3,
  },
}
