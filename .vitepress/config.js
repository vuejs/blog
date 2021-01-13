const { getPosts } = require('./getPosts')

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'The Vue Point',
  description: 'The offical blog for the Vue.js project',
  customData: {
    posts: getPosts()
  }
}
