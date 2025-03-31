import { defineNuxtPlugin } from '#imports'
import { GloriousStore } from '../stores/GloriousStore'
export default defineNuxtPlugin((nuxtApp) => {
  const gs = GloriousStore()
  nuxtApp.hook('app:beforeMount', () => {
    document.onkeydown = (e) => {
      if (e.code === 'Escape') {
        Object.entries(gs.modals).map((item, index) => {
          const [key, value] = item

          if (value) {
            gs.modals[key] = false
          }
        })
      }
    }
  })
})
