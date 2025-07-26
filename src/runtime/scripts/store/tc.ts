export default function (color: string, state: any) {
  const domColor = state.ui.colors.dom['--color-' + color]
  if (typeof domColor !== 'undefined') {
    return domColor
  }

  const [colorName, range] = color.split('-')

  const tailwindColor = state.ui.colors.tailwind as Record<
    string,
    string | Record<string, string>
  >
  const base = tailwindColor[colorName]

  if (typeof base === 'string') {
    return base
  }

  if (typeof base === 'object' && base !== null && range in base) {
    return base[range]
  }
}
