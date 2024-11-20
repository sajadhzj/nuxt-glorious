import type { ModuleOptions } from '../types'
export default <ModuleOptions>{
  fetch: {
    baseURL: '/',
    credentials: 'same-origin',
  },
  seo: {
    suffix: '',
    title: '',
    description: '',
  },
  auth: {
    cookie: {
      name: 'ga-token',
      httpOnly: false,
    },
    redirect: {
      login: '/login',
      logout: '/logout',
    },
    strategy: {
      provider: '',
    },
  },
  components: {
    alert: {
      props: {
        color: 'green',
      },
    },
  },
}
