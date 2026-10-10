import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import remarkGithubEmoji from './remark-github-emoji.js'
import rehypeBubbleNames from './rehype-bubble-names.js'
import rehypeTables from './rehype-tables.js'
import { site } from '../src/site.js'

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkGithubEmoji)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeBubbleNames)
  .use(rehypeTables)
  .use(rehypeSlug)
  .use(rehypeHighlight)
  .use(rehypeStringify)

// Splits a Markdown file into its YAML front matter and body, e.g. content/posts/2020-12-18-hello-world.md.
function parseMarkdown(file, source) {
  const [, frontMatter = '', body = source] =
    source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/) ?? []
  const data = parseYaml(frontMatter) ?? {}
  const [, fileDate, slug] = path.basename(file, '.md').match(/^(?:(\d{4}-\d{2}-\d{2})-)?(.*)$/)
  const meta = {
    slug,
    title: data.title ?? slug,
    date: String(data.date ?? fileDate ?? '').slice(0, 10), // YYYY-MM-DD
    tags: data.tags ?? [],
    lang: data.lang, // e.g. 'vi'; the site default (index.html) is English
  }
  return { meta, body }
}

const renderHtml = (body) => String(markdown.processSync(body))

function readDir(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => parseMarkdown(name, fs.readFileSync(path.join(dir, name), 'utf8')))
}

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Turns content/**/*.md into JS modules: `file.md?meta` exports the front matter,
// `file.md` the rendered HTML. At build time it also writes one HTML entry per
// route, since GitHub Pages has no server-side rewrites, with that page's title,
// lang, canonical URL and og: tags (link previews read these without running JS).
export default function content() {
  let root
  return {
    name: 'content',
    configResolved(config) {
      root = config.root
    },
    transform(source, id) {
      const [file, query] = id.split('?')
      if (!file.endsWith('.md')) return
      const { meta, body } = parseMarkdown(file, source)
      // The dev server adds its own params, e.g. "?import&meta".
      const value = new URLSearchParams(query).has('meta') ? meta : renderHtml(body)
      return { code: `export default ${JSON.stringify(value)}`, map: null }
    },
    writeBundle({ dir }) {
      const posts = readDir(path.join(root, 'content/posts')).map(({ meta }) => meta)
      const pages = readDir(path.join(root, 'content/pages')).map(({ meta }) => meta)
      const tags = new Set([...Object.keys(site.tags), ...posts.flatMap((post) => post.tags)])

      const routes = [
        ...posts.map((post) => ({
          url: `/posts/${post.slug}.html`,
          title: post.title,
          lang: post.lang,
          type: 'article',
        })),
        ...[...tags].map((tag) => ({
          url: `/tags/${tag}.html`,
          title: site.tags[tag] ?? tag,
          type: 'website',
        })),
        ...pages.map((page) => ({ url: `/pages/${page.slug}.html`, title: page.title, type: 'website' })),
      ]

      const write = (url, text) => {
        const file = path.join(dir, url)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, text)
      }

      const index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8')
      for (const { url, title, lang, type } of routes) {
        const fullTitle = escape(`${title} · ${site.title}`)
        write(
          url,
          index
            .replace(/<html lang="[^"]*"/, (html) => (lang ? `<html lang="${lang}"` : html))
            .replace(/<title>[^<]*<\/title>/, () => `<title>${fullTitle}</title>`)
            .replace(/(<link rel="canonical" href=")[^"]*/, (_, start) => start + site.url + url)
            .replace(/(<meta property="og:title" content=")[^"]*/, (_, start) => start + fullTitle)
            .replace(/(<meta property="og:url" content=")[^"]*/, (_, start) => start + site.url + url)
            .replace(/(<meta property="og:type" content=")[^"]*/, (_, start) => start + type),
        )
      }
    },
  }
}
