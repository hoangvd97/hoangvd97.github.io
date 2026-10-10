import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../site.js'

export function useHead(title, type = 'website', lang = 'en') {
  const { pathname } = useLocation()
  // GitHub Pages also serves /posts/slug for /posts/slug.html; the canonical URL always ends in .html.
  const url = site.url + (pathname === '/' || pathname.endsWith('.html') ? pathname : `${pathname}.html`)
  const fullTitle = title ? `${title} · ${site.title}` : site.title
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = fullTitle
    document.querySelector('meta[property="og:title"]').content = fullTitle
    document.querySelector('link[rel="canonical"]').href = url
    document.querySelector('meta[property="og:url"]').content = url
    document.querySelector('meta[property="og:type"]').content = type
  }, [fullTitle, type, lang, url])
}
