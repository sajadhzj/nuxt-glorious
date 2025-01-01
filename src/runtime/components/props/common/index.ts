import type { colors, sizes, rounded as roundedType } from '../../../../types'

export const color = (def: string = 'green') => ({
  color: {
    required: false,
    default: def,
    type: String as () => colors,
  },
})

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
  loadingOption: {
    required: false,
    default: {
      color: 'green',
    },
    type: {
      color: String,
    },
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

export const intSize = (def: number = 20) => ({
  size: {
    required: false,
    type: Number,
    default: def,
  },
})

export const stroke = (def: number | null = null) => ({
  stroke: {
    required: false,
    type: [Number, null],
    default: def,
  },
})

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

export const value = () => ({
  value: {
    required: false,
    default: '',
    type: String,
  },
})

export const required = () => ({
  required: {
    required: false,
    default: false,
    type: Boolean,
  },
})

export const displayTextKey = () => ({
  displayTextKey: {
    required: false,
    default: 'text',
    type: String,
  },
})
