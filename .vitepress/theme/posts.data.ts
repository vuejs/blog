import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createMarkdownRenderer, MarkdownRenderer } from 'vitepress'
import { fileURLToPath } from 'url'

let md: MarkdownRenderer
const dirname = path.dirname(fileURLToPath(import.meta.url))
const postDir = path.resolve(dirname, '../../posts')

export interface Post {
  title: string
  href: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
  data?: Record<string, any>
}

interface PostWithData extends Post {
  data: Record<string, any>
}

declare const data: Post[]
export { data }

async function load(): Promise<Post[]>
async function load(asFeed: boolean): Promise<PostWithData[]>
async function load(asFeed = false) {
  md = md || (await createMarkdownRenderer(process.cwd()))
  return fs
    .readdirSync(postDir)
    .map((file) => getPost(file, postDir, asFeed))
    .sort((a, b) => b.date.time - a.date.time)
}

export default {
  watch: path.join(postDir, '*.md'),
  load
}

const cache = new Map()

function getPost(file: string, postDir: string, asFeed = false): Post {
  const fullePath = path.join(postDir, file)
  const timestamp = fs.statSync(fullePath).mtimeMs

  const cached = cache.get(fullePath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  const src = fs.readFileSync(fullePath, 'utf-8')
  const { data, excerpt } = matter(src, { excerpt: true })

  const post: Post = {
    title: data.title,
    href: `/posts/${file.replace(/\.md$/, '.html')}`,
    date: formatDate(data.date),
    excerpt: excerpt && md.render(excerpt)
  }
  if (asFeed) {
    // only attach these when building the RSS feed to avoid bloating the
    // client bundle size
    post.data = data
  }

  cache.set(fullePath, {
    timestamp,
    post
  })

  return post
}

function formatDate(date: string | Date): Post['date'] {
  if (!(date instanceof Date)) {
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
