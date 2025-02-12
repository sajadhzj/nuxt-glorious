import { GloriousStore } from '../stores/GloriousStore'

const numbersWithSeparateSamePrice = (value: String) => {
  if (typeof value === 'undefined') return ''

  let nStr = value.match(/\d+/g)?.join('') + ''
  nStr = nStr.replace(/\,/g, '')
  if (nStr === 'undefined') nStr = ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  let rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }

  return x1 + x2
}

const debounce = (callback: () => void, delay: number): void => {
  const gs = GloriousStore()
  clearTimeout(gs.gloriousCoreDebounce)

  gs.gloriousCoreDebounce = setTimeout(function () {
    callback()
  }, delay)
}

export default () => {
  return {
    debounce,
    numbersWithSeparateSamePrice,
  }
}
