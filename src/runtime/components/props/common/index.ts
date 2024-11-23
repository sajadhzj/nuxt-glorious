import type { colors, sizes, rounded as roundedType } from '../../../../types'

export const color = {
  color: {
    required: false,
    default: 'green',
    type: String as () => colors,
  },
}

export const size = (def: sizes = 'md') => ({
  size: {
    required: false,
    default: def,
    type: String as () => sizes,
  },
})

export const rounded = {
  size: {
    required: false,
    default: 'md',
    type: String as () => roundedType,
  },
}

export const disabled = {
  disabled: {
    required: false,
    default: false,
    type: Boolean,
  },
}

export const loading = {
  loading: {
    required: false,
    default: false,
    type: Boolean,
  },
}

export const to = {
  to: {
    required: false,
    default: '',
    type: String,
  },
}

export const ariaLabel = {
  ariaLabel: {
    required: false,
    default: '',
    type: String,
  },
}

export const checked = {
  checked: {
    required: false,
    default: false,
    type: Boolean,
  },
}

export const error = {
  error: {
    required: false,
    default: '|',
    type: String,
  },
}

export const placeholder = (def: string = '') => ({
  placeholder: {
    required: false,
    default: def,
    type: String,
  },
})

export const title = (def: string = '') => ({
  title: {
    required: false,
    default: def,
    type: String,
  },
})

export const text = (def: string = '') => ({
  text: {
    required: false,
    default: def,
    type: String,
  },
})

export const name = {
  name: {
    required: true,
    type: String,
    default: '',
  },
}

export const hashColor = {
  color: {
    required: false,
    type: String,
    default: '#000',
  },
}

export const intSize = {
  size: {
    required: false,
    type: Number,
    default: 20,
  },
}

export const stroke = {
  stroke: {
    required: false,
    type: [Number, null],
    default: null,
  },
}

export const icon = {
  icon: {
    required: false,
    default: '',
    type: String,
  },
}

export const options = {
  options: {
    required: false,
    default: [],
    type: Array<object>,
  },
  loadingOptions: {
    required: false,
    default: false,
    type: Boolean,
  },
}
