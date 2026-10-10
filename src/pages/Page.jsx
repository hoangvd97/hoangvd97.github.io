import { Navigate, useParams } from 'react-router'
import Markdown from '../components/Markdown.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { pages, slugOf } from '../content.js'
import { useHead } from '../hooks/useHead.js'

export default function Page() {
  const slug = slugOf(useParams().file)
  const page = pages.find((p) => p.slug === slug)
  useHead(page?.title, 'website')

  if (!page) return <Navigate to="/" replace />

  return (
    <>
      <PageHeader title={page.title} />
      <Markdown file={page.file} />
    </>
  )
}
