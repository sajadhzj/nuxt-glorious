export interface gloriousFetchOptions {
  validationRequest?: any
  gKey?: String
  params?: Object
  server?: Boolean
  is$?: Boolean
  lazy?: Boolean
  headers?: Object
  body?: Object
  keepResponse?: Boolean
  bodyType?: 'formData' | 'formDataCustom' | 'normal'
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD'
  credentials?: 'same-origin' | 'include'
  watch?: Array<Object>
}
