import type { gloriousFetchOptions } from './gloriousFetchOptionsInterface'

const options: gloriousFetchOptions = {
  validationRequest: [],
  server: false,
  method: 'GET',
  lazy: true,
  is$: true,
  keepResponse: false,
  params: {},
  headers: {
    Accept: 'application/json',
  },
  bodyType: 'normal',
  credentials: 'same-origin',
}

export default options
