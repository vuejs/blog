// @ts-check
require('./genMetadata').watchPosts()

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'The Vue Point',
  description: 'The offical blog for the Vue.js project',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  ]
}
