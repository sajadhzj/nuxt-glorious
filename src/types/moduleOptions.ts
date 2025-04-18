import type { colors, sizes } from './components'
export interface ModuleOptions {
  fetch?: {
    baseURL?: string
    credentials?: 'same-origin' | 'include'
  }
  seo?: {
    suffix?: string
    title?: string
    description?: string
  }
  auth?: {
    cookie?: {
      name?: string
      httpOnly?: boolean
    }
    redirect?: {
      logout?: string
      login?: string
    }
    strategy?: {
      provider?: 'laravel-passport'
      endpoints?: {
        userInfo?: {
          url?: string
          method?: 'GET' | 'POST' | 'PUT' | 'PATCH'
          pick?: string
        }
      }
    }
  }
  components: {
    accordion: {
      props: {
        color?: string
      }
    }
    alert: {
      props: {
        color?: string
      }
    }
    avatar: {
      props: {
        size?: sizes
        rounded?: string
        alt?: string
      }
    }
    breadcrumb: {
      props: {
        divider?: string
      }
    }
    button: {
      props: {
        color?: colors
        size?: sizes
        disabled?: boolean
        loading?: boolean
        outline?: boolean
      }
    }
    checkbox: {
      props: {
        color?: colors
        size?: sizes
        disabled?: boolean
        checked?: boolean
      }
    }
    drawer: {
      props: {
        position?: 'left' | 'right'
      }
    }
    file: {
      props: {
        color?: colors
        placeholder?: string
        title?: string
        text?: string
        size?: sizes
        required?: boolean
      }
    }
    icon: {
      props: {
        color?: colors
        size?: number
        stroke?: number
      }
    }
    input: {
      props: {
        color?: colors
        placeholder?: string
        title?: string
        displayTextKey?: string
        required?: boolean
        disable?: boolean
        loading?: boolean
        type?: string
        autocomplete?: string
        display?: 'price' | 'normal'
        inputMode?: string
        mode?: 'normal' | 'tag'
        tagLockOption?: boolean
      }
    }
    loading: {
      props: {
        color?: colors
        size?: number
        stroke?: number
      }
    }
    modal: {
      props: {
        colorBtn?: colors
        size?: sizes
      }
    }
    paginate: {
      props: {
        numberSuggestPage?: number
      }
    }
    radio: {
      props: {
        size?: sizes
        color?: colors
        checked?: boolean
        name?: string
      }
    }
    switch: {
      props: {
        color?: colors
        checked: boolean
      }
    }
    tab: {
      props: {
        color?: colors
      }
    }
    table: {
      props: {
        color?: colors
        loading?: boolean
        loadingColor?: colors
        emptyText: string
      }
    }
    textarea: {
      props: {
        color?: colors
        placeholder?: string
        title?: string
        required?: boolean
        disabled?: boolean
        rows?: number
      }
    }
    timeline: {
      props: {
        color?: colors
      }
    }
    select: {
      props: {
        color?: colors
        size?: sizes
        disabled?: false
        required?: false
        displayTextKey?: string
        keyOfValue?: string
      }
    }
  }
}
