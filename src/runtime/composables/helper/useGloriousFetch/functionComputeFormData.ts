import type { gloriousFetchOptions } from './gloriousFetchOptionsInterface'

export default (options: gloriousFetchOptions) => {
  const form: any = new FormData()

  Object.entries(<Object>options.body).forEach((item: any) => {
    if (item[1] === null) return

    if (
      typeof item[1] === 'object' &&
      typeof item[1].lastModifiedDate === 'undefined' &&
      typeof item[1].type === 'undefined' &&
      typeof item[1].size === 'undefined'
    )
      Object.entries(item[1]).forEach((nestedItem, index) => {
        form.append(`${item[0]}[${index}]`, nestedItem[1])
      })
    else {
      form.append(`${item[0]}`, item[1])
    }
  })

  return form
}
