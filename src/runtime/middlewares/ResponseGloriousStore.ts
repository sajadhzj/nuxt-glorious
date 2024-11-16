import { defineNuxtRouteMiddleware } from '#imports'
import { GloriousStore } from '../stores/GloriousStore'

export default defineNuxtRouteMiddleware(() => {
  const gs = GloriousStore()
  Object.entries(gs.response).forEach((element) => {
    if (!gs.keepResponse.includes(element[0])) delete gs.response[element[0]]
  })
})
