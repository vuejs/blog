import { createWriteStream } from 'node:fs'
import { defineConfig } from 'vitepress'
import { SitemapStream } from 'sitemap'
import { resolve } from 'node:path'

const links: string[] = []

const hostname = 'https://blog.vuejs.org/'

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
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'NYHGSGQV',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push(pageData.relativePath.replace(/\.md$/, '.html'))
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  }
})
