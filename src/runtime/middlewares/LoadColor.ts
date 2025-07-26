import { defineNuxtRouteMiddleware, useNuxtApp } from '#imports'
import { GloriousStore } from '../stores/GloriousStore'
import colors from 'tailwindcss/colors'

export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()
  const gs = GloriousStore()

  nuxtApp.hook('app:mounted', () => {
    const styles = getComputedStyle(document.documentElement)
    type stringObject = { [key: string]: string }
    let colorVars: stringObject = {}

    for (let i = 0; i < styles.length; i++) {
      const name = styles[i]
      if (name.startsWith('--color-')) {
        colorVars[name] = styles.getPropertyValue(name).trim()
      }
    }

    gs.ui.colors = {
      tailwind: colors,
      dom: colorVars,
    }

    console.log(gs.ui.colors)
  })
})
