import { gemoji } from 'gemoji'
import { findAndReplace } from 'mdast-util-find-and-replace'

// Renders :shortcode: as GitHub's emoji images.
const BASE = 'https://github.githubassets.com/images/icons/emoji/'

// GitHub-only emoji with no Unicode equivalent.
// prettier-ignore
const CUSTOM = [
  'accessibility', 'atom', 'basecamp', 'basecampy', 'bowtie', 'copilot', 'dependabot', 'electron',
  'feelsgood', 'finnadie', 'fishsticks', 'goberserk', 'godmode', 'hurtrealbad', 'neckbeard',
  'octocat', 'rage1', 'rage2', 'rage3', 'rage4', 'shipit', 'suspect', 'trollface',
]

const urls = new Map(CUSTOM.map((name) => [name, `${BASE}${name}.png`]))
for (const { emoji, names } of gemoji) {
  // GitHub names the image after the codepoints, without variation selectors and zero-width joiners.
  const file = [...emoji]
    .map((char) => char.codePointAt(0).toString(16).padStart(4, '0'))
    .filter((hex) => hex !== 'fe0f' && hex !== '200d')
    .join('-')
  for (const name of names) urls.set(name, `${BASE}unicode/${file}.png`)
}

export default function remarkGithubEmoji() {
  return (tree) => {
    findAndReplace(tree, [
      /:([a-z0-9_+-]+):/g,
      (shortcode, name) => {
        const url = urls.get(name)
        if (!url) return false
        return {
          type: 'image',
          url,
          alt: shortcode,
          title: shortcode,
          // Lazy, so a page with many emoji doesn't start hundreds of requests at once.
          data: { hProperties: { className: ['emoji'], width: 20, height: 20, loading: 'lazy' } },
        }
      },
    ])
  }
}
