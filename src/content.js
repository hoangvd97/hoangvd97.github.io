import { use } from 'react'

// plugins/content.js compiles each Markdown file to { slug, title, date, tags, lang } (`?meta`)
// and, separately, to its rendered HTML. Front matter is bundled; each HTML body is its own chunk.
const withFile = (modules) => Object.entries(modules).map(([file, meta]) => ({ ...meta, file }))

export const posts = withFile(
  import.meta.glob('/content/posts/*.md', { eager: true, query: '?meta', import: 'default' }),
).sort((a, b) => b.date.localeCompare(a.date))

export const pages = withFile(
  import.meta.glob('/content/pages/*.md', { eager: true, query: '?meta', import: 'default' }),
)

const html = import.meta.glob('/content/{posts,pages}/*.md', { import: 'default' })
const loading = new Map()

// Rendered HTML of a post or page. Suspends until its chunk has loaded.
export function useHtml(file) {
  if (!loading.has(file)) loading.set(file, html[file]())
  return use(loading.get(file))
}

// "hello-world.html" → "hello-world". GitHub Pages also serves the URL without ".html".
export const slugOf = (file) => file.replace(/\.html$/, '')

// "2020-12-18" → "18/12/2020"
export const formatDate = (date) => date.split('-').reverse().join('/')
