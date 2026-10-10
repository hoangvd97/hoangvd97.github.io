// Exports the header avatar (AvatarIcon in src/components/icons.jsx) as a PNG.
// Usage: yarn export:avatar [size] [file]   (default: 512px, public/img/avatar.png)
//
// The icon is rendered at its header size (50px) and then scaled up, so the frame keeps the
// thickness it has in the header. Its line color is the --color-avatar token from src/index.css.
import fs from 'node:fs'
import path from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Resvg } from '@resvg/resvg-js'
import { createServer } from 'vite'

const size = Number(process.argv[2]) || 512
const out = process.argv[3] || 'public/img/avatar.png'

// Load icons.jsx through Vite, which compiles the JSX.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { AvatarIcon } = await server.ssrLoadModule('/src/components/icons.jsx')
await server.close()

const color = fs
  .readFileSync('src/index.css', 'utf8')
  .match(/--color-avatar:\s*([^;]+);/)[1]
  .trim()
const svg = renderToStaticMarkup(createElement(AvatarIcon)).replace(
  '<svg ',
  `<svg xmlns="http://www.w3.org/2000/svg" color="${color}" `,
)

const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, png)
console.log(`${out}: ${size}×${size}, ${(png.length / 1024).toFixed(1)} KB`)
