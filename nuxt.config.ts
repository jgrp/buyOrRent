// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@primevue/nuxt-module'
  ],
  plugins: [
    './plugins/primevue.ts'
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        darkModeSelector: '.app-dark',
      },
      inputVariant: 'filled',
    }
  }
})