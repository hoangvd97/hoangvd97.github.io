import { Navigate, useParams } from 'react-router'
import PageHeader from '../components/PageHeader.jsx'
import PostList from '../components/PostList.jsx'
import { posts, slugOf } from '../content.js'
import { site } from '../site.js'
import { useHead } from '../hooks/useHead.js'

export default function Tag() {
  const tag = slugOf(useParams().file)
  const tagged = posts.filter((post) => post.tags.includes(tag))
  const title = site.tags[tag] ?? (tagged.length > 0 ? tag : undefined)
  useHead(title, 'website')

  if (!title) return <Navigate to="/" replace />

  return (
    <>
      <PageHeader title={`#${title}`} />
      <PostList posts={tagged} />
    </>
  )
}
