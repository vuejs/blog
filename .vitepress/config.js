const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

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

function getPosts() {
  const postDir = path.resolve(__dirname, '../posts')
  return fs.readdirSync(postDir).map((file) => {
    const src = fs.readFileSync(path.join(postDir, file), 'utf-8')
    const { data, excerpt } = matter(src, { excerpt: true })
    return {
      title: data.title,
      href: `/posts/${file.replace(/\.md$/, '.html')}`,
      date: data.date instanceof Date ? +data.date : null,
      excerpt
    }
  }).sort((a, b) => b.date - a.date)
}
