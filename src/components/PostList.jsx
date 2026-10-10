import { Link } from 'react-router'
import { formatDate } from '../content.js'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.slug}
          className="my-10 flex items-baseline gap-12 leading-[1.8] mobile:gap-10 mobile:leading-normal"
        >
          <time className="font-mono text-[0.9rem] text-muted">{formatDate(post.date)}</time>
          <Link
            to={`/posts/${post.slug}.html`}
            lang={post.lang}
            className="text-heading hover:text-link hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
