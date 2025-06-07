import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

// Beispiel für globale Komponenten
import Button from 'primevue/button'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue)
  nuxtApp.vueApp.component('Button', Button)
})