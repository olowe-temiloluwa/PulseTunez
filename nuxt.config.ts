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
    serverBundle: {
      collections: ['heroicons']
    }
  },
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    configPath: 'tailwind.config.js',
    config: {
      darkMode: 'class'
    }
  },
  app: {
    head: {
      title: 'PulseTunez - Audio & Music Equipment Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium audio gadgets, musical instruments, and studio equipment at PulseTunez' }
      ],
      script: [
        {
          key: 'theme-init',
          innerHTML: `(function(){try{var t=localStorage.getItem('theme')||'device';var d=t==='dark'||(t==='device'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';r.dataset.theme=t;}catch(e){}})();`,
          type: 'text/javascript',
          tagPosition: 'head'
        }
      ]
    }
  }
})
