const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

exports.getPosts = function getPosts(asFeed = false) {
  const postDir = path.resolve(__dirname, '../posts')
  return fs
    .readdirSync(postDir)
    .map((file) => {
      const src = fs.readFileSync(path.join(postDir, file), 'utf-8')
      const { data, content, excerpt } = matter(src, { excerpt: true })
      const post = {
        title: data.title,
        href: `/posts/${file.replace(/\.md$/, '.html')}`,
        date: formatDate(data.date),
        excerpt
      }
      if (asFeed) {
        // only attach these when building the RSS feed to avoid bloating the
        // client bundle size
        post.data = data
      }
      return post
    })
    .sort((a, b) => b.date.time - a.date.time)
}

function formatDate(date) {
  if (!date instanceof Date) {
    date = new Date(date)
  }
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
