import PostList from '../components/PostList.jsx'
import { posts } from '../content.js'
import { useHead } from '../hooks/useHead.js'

export default function Home() {
  useHead()
  return <PostList posts={posts} />
}
