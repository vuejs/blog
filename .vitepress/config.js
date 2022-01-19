import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'The Vue Point',
  description: 'The offical blog for the Vue.js project',
  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  ],
  vite: {
    build: {
      minify: 'terser'
    }
  }
})
