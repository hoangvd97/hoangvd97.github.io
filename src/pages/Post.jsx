import { Link, Navigate, useParams } from 'react-router'
import Markdown from '../components/Markdown.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { formatDate, posts, slugOf } from '../content.js'
import { useHead } from '../hooks/useHead.js'

export default function Post() {
  const slug = slugOf(useParams().file)
  const post = posts.find((p) => p.slug === slug)
  useHead(post?.title, 'article', post?.lang)

  if (!post) return <Navigate to="/" replace />

  return (
    <article lang={post.lang}>
      <PageHeader title={post.title}>
        <time className="font-mono text-muted">{formatDate(post.date)}</time>
        <div className="mt-10 flex justify-center gap-4">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/tags/${tag}.html`}>
              #{tag}
            </Link>
          ))}
        </div>
      </PageHeader>
      <Markdown file={post.file} />
    </article>
  )
}
