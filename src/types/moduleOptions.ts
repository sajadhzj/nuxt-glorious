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
      provider?: 'laravel-passport' | ''
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
    alert: {
      props: {
        color: string
      }
    }
  }
}
