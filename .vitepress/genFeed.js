import fs from 'fs'
import path from 'path'
import { Feed } from 'feed'
import postsData from './posts.data.js'
import { fileURLToPath } from 'url'

const url = `https://blog.vuejs.org`
const dirname = path.dirname(fileURLToPath(import.meta.url))

const feed = new Feed({
  title: 'The Vue Point',
  description: 'The official blog for the Vue.js project',
  id: url,
  link: url,
  language: 'en',
  image: 'https://vuejs.org/images/logo.png',
  favicon: `${url}/favicon.ico`,
  copyright: 'Copyright (c) 2021-present, Yuxi (Evan) You and blog contributors'
})

postsData.load(true).then((posts) => {
  posts.forEach((post) => {
    const file = path.resolve(dirname, `dist${post.href}`)
    const rendered = fs.readFileSync(file, 'utf-8')
    const content = rendered.match(
      /<div [^<>]+?class="prose[^<>]+?>([\s\S]*)<\/div><\/div><footer/
    )

    feed.addItem({
      title: post.title,
      id: `${url}${post.href}`,
      link: `${url}${post.href}`,
      description: post.excerpt,
      content: content[1],
      author: [
        {
          name: post.data.author,
          link: post.data.twitter
            ? `https://twitter.com/${post.data.twitter}`
            : undefined
        }
      ],
      date: post.data.date
    })
  })

  fs.writeFileSync(path.resolve(dirname, 'dist/feed.rss'), feed.rss2())
})
