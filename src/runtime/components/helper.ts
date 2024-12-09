import { GloriousStore } from '../stores/GloriousStore'

export const createBlurDom = (callback: Function) => {
  const div = document.createElement('div')
  div.classList.add(
    'fixed',
    'top-0',
    'right-0',
    'backdrop-blur-sm',
    'bg-gray-500',
    'bg-opacity-50',
    'h-full',
    'w-full',
    'z-[40]',
    'glorious-backdrop'
  )

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
