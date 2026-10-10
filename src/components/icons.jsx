import { useId } from 'react'
import { avatarPath, avatarSilhouette } from './avatarPath.js'

const size = 18
const strokePx = 1.1 // line width on screen; strokeWidth is in viewBox units, so scale it

const props = {
  width: size,
  height: size,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: (strokePx * 20) / size,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function BloggerIcon() {
  return (
    <svg {...props}>
      <path d="M6.7 17.5h6.6a4.2 4.2 0 0 0 4.2-4.2v-2.5a2.5 2.5 0 0 0-2.5-2.5h-.8V6.7a4.2 4.2 0 0 0-4.2-4.2H6.7a4.2 4.2 0 0 0-4.2 4.2v6.6a4.2 4.2 0 0 0 4.2 4.2Z" />
      <rect x="5.9" y="5.9" width="5" height="2.4" rx="1.2" />
      <rect x="5.9" y="11.7" width="8.3" height="2.4" rx="1.2" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg {...props}>
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 1.6v2M10 16.4v2M18.4 10h-2M3.6 10h-2M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4M15.9 15.9l-1.4-1.4M5.5 5.5 4.1 4.1" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg {...props}>
      <path d="M16.5 11.8A7 7 0 0 1 8.2 3.5a7 7 0 1 0 8.3 8.3Z" />
    </svg>
  )
}

export function LaptopIcon() {
  return (
    <svg {...props}>
      <rect x="3.25" y="4.5" width="13.5" height="8.5" rx="0.8" />
      <path d="M2.25 15.5h15.5" />
    </svg>
  )
}

export function FacebookIcon() {
  return (
    <svg {...props}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.2" />
      <path d="M12.4 6.4h-1.1c-.9 0-1.3.5-1.3 1.4v9.7M8.2 10.4h3.9" />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg {...props}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.2" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="14.3" cy="5.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function GithubIcon() {
  return (
    <svg {...props} viewBox="0 0 24 24" strokeWidth={(strokePx * 24) / size}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21" />
    </svg>
  )
}

export function LinkedinIcon() {
  return (
    <svg {...props}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.2" />
      <path d="M6.6 8.9v5.5" />
      <circle cx="6.6" cy="6.2" r="0.8" fill="currentColor" stroke="none" />
      <path d="M10.3 14.4V8.9" />
      <path d="M10.3 11.3c0-1.4 1-2.4 2.2-2.4s2.2 1 2.2 2.4v3.1" />
    </svg>
  )
}

export function CameraIcon() {
  return (
    <svg {...props}>
      <path d="M4.25 3.25h3.5" />
      <rect x="2.75" y="5.75" width="14.5" height="11" rx="0.8" />
      <circle cx="11.5" cy="11.25" r="3.25" />
    </svg>
  )
}

// The avatar: a traced line drawing (see avatarPath.js) in the current text color, inside a
// rounded frame. The person is filled white on a light blue background, in both themes. The
// drawing is scaled to 90% and sits on the bottom edge, leaving room above the hair, and is
// clipped to the frame so the shoulders end at its rounded corners.
export function AvatarIcon({ size: px = 50 }) {
  const clipId = useId()
  const stroke = (strokePx * 100) / px
  const frame = {
    x: stroke / 2,
    y: stroke / 2,
    width: 100 - stroke,
    height: 100 - stroke,
    rx: 14,
  }
  return (
    <svg width={px} height={px} viewBox="0 0 100 100" aria-hidden="true">
      <rect {...frame} fill="#bdf" />
      <clipPath id={clipId}>
        <rect {...frame} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <g transform="translate(5 10) scale(0.9)">
          <path fill="#fff" d={avatarSilhouette} />
          <path fill="currentColor" fillRule="evenodd" d={avatarPath} />
        </g>
      </g>
      <rect {...frame} fill="none" stroke="currentColor" strokeWidth={stroke} />
    </svg>
  )
}
