import { Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import ThemeToggle from './ThemeToggle.jsx'
import { AvatarIcon, CameraIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from './icons.jsx'
import { site } from '../site.js'

const githubLink = {
  label: 'GitHub',
  href: `https://github.com/${site.author.github}`,
  Icon: GithubIcon,
}

const socialLinks = [
  { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedinIcon },
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
  {
    label: 'Photos',
    href: site.social.photos,
    Icon: CameraIcon,
    internal: true,
  },
].filter((link) => link.href)

const iconButton =
  '-my-5 flex size-26 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-link'

function IconLink({ label, href, Icon, tooltipSide, internal }) {
  return (
    <a
      href={href}
      target={internal ? '_self' : '_blank'}
      rel={internal ? undefined : 'noopener noreferrer'}
      aria-label={label}
      data-tooltip={label}
      data-tooltip-side={tooltipSide}
      className={iconButton}
    >
      <Icon />
    </a>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto max-w-550 rounded-md bg-card p-35 shadow-[0_5px_15px_var(--color-shadow)] transition-[background-color,box-shadow] duration-300 mobile:rounded-none mobile:p-18">
      <header className="flex items-end gap-8">
        <Link to="/" aria-label="Home" className="size-50 shrink-0 text-avatar hover:text-avatar-hover">
          <AvatarIcon />
        </Link>
        <div className="flex grow items-center justify-between gap-8 border-b border-line pb-5">
          <h1 className="flex flex-col items-start text-[1.4rem] leading-[1.2] font-medium">
            <Link to="/">{site.author.name}</Link>
            <span className="text-[1rem] font-normal text-muted">@{site.author.github}</span>
          </h1>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <IconLink key={link.label} {...link} tooltipSide="bottom" />
            ))}
            {socialLinks.length > 0 && <span className="mx-4 h-14 w-1 bg-line" aria-hidden="true" />}
            <ThemeToggle className={iconButton} tooltipSide="bottom" tooltipAlign="end" />
          </div>
        </div>
      </header>

      <main
        key={pathname}
        className="mx-auto my-10 h-[calc(100dvh-240px)] overflow-auto mobile:h-[calc(100dvh-132px)]"
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </main>

      <footer className="flex items-center justify-between border-t border-line pt-8 text-[0.95rem] text-muted">
        <span>
          {new Date().getFullYear()} &copy; {site.author.name}
        </span>
        <IconLink {...githubLink} tooltipSide="top" />
      </footer>
    </div>
  )
}
