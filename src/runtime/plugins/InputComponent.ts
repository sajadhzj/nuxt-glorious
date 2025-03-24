import { defineNuxtPlugin } from '#imports'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    window.addEventListener('click', (event: any) => {
      function getElementPosition(element) {
        let rect = element.getBoundingClientRect()
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return rect.top + scrollTop
      }

      if (!event.target.matches('.glorious-input-field')) {
        const options = document.querySelectorAll('.glorious-input-options')
        options.forEach((el) => {
          el.classList.add('hidden')
        })
      }

      if (
        event.target.matches('.glorious-input-field') &&
        event.target.classList.contains('mode-tag')
      ) {
        if (
          typeof event.target.nextElementSibling?.offsetHeight !== 'undefined'
        ) {
          if (
            window.innerHeight <
            getElementPosition(event.target) +
              event.target.offsetHeight +
              event.target.nextElementSibling.offsetHeight
          ) {
            event.target.nextElementSibling.style.width = `${event.target.offsetWidth}px`
          } else {
            event.target.nextElementSibling.style.width = `${event.target.offsetWidth}px`
          }
        }
      }
    })
  })
})
