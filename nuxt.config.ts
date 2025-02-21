// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/styles/global.css',
    '~/assets/scss/main.scss'
  ],

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    'dayjs-nuxt',
    '@formkit/auto-animate/nuxt',
    '@samk-dev/nuxt-vcalendar',
    '@nuxt/fonts',
  ],
})