import { useHtml } from '../content.js'

export default function Markdown({ file }) {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: useHtml(file) }} />
}
