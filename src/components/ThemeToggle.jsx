import { useEffect, useState } from 'react'
import { LaptopIcon, MoonIcon, SunIcon } from './icons.jsx'

const modes = {
  light: { label: 'Light Mode', Icon: SunIcon, next: 'dark' },
  dark: { label: 'Dark Mode', Icon: MoonIcon, next: 'device' },
  device: { label: 'Device Mode', Icon: LaptopIcon, next: 'light' },
}

function savedMode() {
  try {
    const theme = localStorage.getItem('theme')
    if (theme === 'light' || theme === 'dark') return theme
  } catch {
    // Storage can be blocked (e.g. private mode).
  }
  return 'device'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.getElementById('theme-color').content = theme === 'dark' ? '#2d2d2d' : '#ffffff'
}

export default function ThemeToggle({ className, tooltipSide, tooltipAlign }) {
  const [mode, setMode] = useState(savedMode)

  useEffect(() => {
    if (mode !== 'device') {
      applyTheme(mode)
      return
    }
    const deviceDark = matchMedia('(prefers-color-scheme: dark)')
    const follow = () => applyTheme(deviceDark.matches ? 'dark' : 'light')
    follow()
    deviceDark.addEventListener('change', follow)
    return () => deviceDark.removeEventListener('change', follow)
  }, [mode])

  function cycle() {
    const nextMode = modes[mode].next
    try {
      if (nextMode === 'device') localStorage.removeItem('theme')
      else localStorage.setItem('theme', nextMode)
    } catch {
      // Storage can be blocked (e.g. private mode); the theme still applies for this visit.
    }
    setMode(nextMode)
  }

  const { label, Icon } = modes[mode]
  return (
    <button
      type="button"
      aria-label={label}
      data-tooltip={label}
      data-tooltip-side={tooltipSide}
      data-tooltip-align={tooltipAlign}
      onClick={cycle}
      className={className}
    >
      <Icon />
    </button>
  )
}
