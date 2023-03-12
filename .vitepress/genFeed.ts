import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { Feed } from 'feed'
import { fileURLToPath } from 'url'
import { load } from './theme/posts.data.js'

const url = `https://blog.vuejs.org`
const dirname = path.dirname(fileURLToPath(import.meta.url))

export async function genFeed() {
  const feed = new Feed({
    title: 'The Vue Point',
    description: 'The official blog for the Vue.js project',
    id: url,
    link: url,
    language: 'en',
    image: 'https://vuejs.org/images/logo.png',
    favicon: `${url}/favicon.ico`,
    copyright:
      'Copyright (c) 2021-present, Yuxi (Evan) You and blog contributors'
  })

  for (const post of await load(true)) {
    const file = path.resolve(dirname, `dist${post.href}.html`)
    const rendered = readFileSync(file, 'utf-8')
    const content = rendered.match(
      /<div [^<>]+?class="prose[^<>]+?>([\s\S]*)<\/div><\/div><footer/
    )

    if (!content) {
      throw new Error(`no content match found for file ${post.href}`)
    }

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
  }

  writeFileSync(path.resolve(dirname, 'dist/feed.rss'), feed.rss2())
}
