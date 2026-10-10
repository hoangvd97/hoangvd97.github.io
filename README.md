# hoangvd97.github.io

Personal site: React, Tailwind CSS and Vite, built to static files and hosted on GitHub Pages.
It is also a PWA: it can be installed, and after the first visit every page can be read offline.

## Getting started

Uses Yarn 1.

```sh
yarn             # install dependencies
yarn dev         # http://localhost:5173
yarn build       # → dist/
yarn preview     # serve dist/ locally
yarn format      # format code with Prettier
yarn export:avatar [size] [file]  # header avatar as PNG (default 512px, public/img/avatar.png)
```

## Writing

- **Posts:** `content/posts/YYYY-MM-DD-slug.md`, served at `/posts/slug.html`.
- **Pages:** `content/pages/slug.md`, served at `/pages/slug.html`.
- **Drafts:** `content/drafts/`, ignored by git and not built. Move a draft to `content/posts/` to publish it.

```md
---
title: Hello, World!
date: 2020-12-18        # optional, defaults to the date in the file name
tags: [random]
lang: vi                # optional, for posts that are not in English
---
```

Site settings and tag page titles live in `src/site.js`.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.
In the repository's **Settings → Pages**, set **Source** to **GitHub Actions** (one-time setup).

## License

- **Code** is released under the [MIT License](LICENSE).
- **Posts and pages** in `content/` are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may share and adapt them if you credit Hoang VD and link to the original post.
