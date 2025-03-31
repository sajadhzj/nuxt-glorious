import { useRuntimeConfig } from '#app'
import { GloriousStore } from '../stores/GloriousStore'

export const createBlurDom = (callback: Function) => {
  const div = document.createElement('div')
  div.classList.add('glorious-backdrop')

  const nuxt = document.getElementById('__nuxt')
  nuxt?.appendChild(div)

  div.addEventListener('click', () => {
    callback()
    div.remove()
  })
}

export const removeBlurDom = () => {
  const blur = document.querySelector('.glorious-backdrop') as HTMLDivElement

  if (blur !== null) blur.remove()
}

export const hasValidationError = (errorProp: string): boolean => {
  const gs = GloriousStore()
  const error: any = errorProp.split('|')

  let condition = false
  if (typeof gs.forms[error[0]]?.errors !== 'undefined')
    condition = Object.prototype.hasOwnProperty.call(
      gs.forms[error[0]]?.errors,
      error[1]
    )

  return condition
}

export const getAttribute = (
  propsValue: any,
  componentName: string,
  prop: string
) => {
  let mount = propsValue

  if (import.meta.client) {
    const config: any = useRuntimeConfig()
    mount =
      config.public?.glorious?.components?.[componentName]?.props?.[prop] ||
      propsValue
  }

  return mount
}
