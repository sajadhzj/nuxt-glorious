import { createError } from '#app'
import { GloriousStore } from '../../../stores/GloriousStore'
let hasError: boolean = false
let _gKey: any

export default (validationRequest: any, gKey: String, body: any): void => {
  _gKey = gKey

  Object.entries(validationRequest).forEach((item) => {
    const [key, value] = item as [string, Array<String>]

    value.forEach((itemOfValue: any) => {
      validations[itemOfValue](body[key], key)
    })
  })

  if (hasError) {
    throw createError({
      statusCode: 422,
      statusMessage: 'validation request error',
    })
  }
}

const validations: any = {
  required: (mount: unknown, key: any) => {
    if (mount === '' || mount === null) {
      setError(key, `${key} is required`)
      hasError = true
    } else {
      setError(key)
    }
  },
}

const setError = (key: any, value: any = []) =>
  (GloriousStore().forms[_gKey].errors[key] = value.length === 0 ? [] : [value])
