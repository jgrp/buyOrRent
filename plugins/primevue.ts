import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura
    },
    inputVariant: "filled"
  });
});