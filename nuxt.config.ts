// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],
  icon: {
    provider: 'iconify',
    collections: ['heroicons']
  },
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    darkMode: 'class'
  },
  app: {
    head: {
      title: 'PulseTunez - Audio & Music Equipment Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium audio gadgets, musical instruments, and studio equipment at PulseTunez' }
      ]
    }
  }
})
