import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import Tag from './pages/Tag.jsx'
import Page from './pages/Page.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts/:file" element={<Post />} />
        <Route path="tags/:file" element={<Tag />} />
        <Route path="pages/:file" element={<Page />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
