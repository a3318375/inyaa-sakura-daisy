import { presetIcons } from 'unocss'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@nuxtjs/tailwindcss'],
  unocss: {
    presets: [
      presetIcons({
        scale: 1.2,
      })],
  },
  meta: {
    script: [
      { src: 'https://media.inyaw.com/css/APlayer/APlayer.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/live2dcubismcore.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/pixi.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/live2dv3.min.js' },
    ],
    link: [
    ],
  },
  css: [
    // CSS file in the project
    '@/assets/main.css',
    '@/assets/Aplayer.min.css',
  ],
})
