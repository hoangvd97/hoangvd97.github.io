---
title: Markdown Guide
---
Everything a post on this blog can use. Each section shows the Markdown source first, then how it renders.

## Writing a post

Create `content/posts/YYYY-MM-DD-slug.md`. It is published at `/posts/slug.html`. The file starts with this header, and the post follows it:

```yaml
---
title: Hello, World!
date: 2020-12-18     # optional: date in file name
tags: [random, til]  # pages at /tags/<tag>.html
lang: vi             # optional: if not in English
---
```

Unfinished posts go in `content/drafts/`: they are not built or committed. Move one to `content/posts/` to publish it.

Pages work the same way in `content/pages/slug.md` (served at `/pages/slug.html`), with only a `title`.

## Headings

```md
## Section
### Subsection
#### Smaller heading
```

They render like the section titles on this page. Every heading gets an id from its text, so you can link to it: `[see Tables](#tables)` → [see Tables](#tables).

## Text

```md
**bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`,
<mark>highlight</mark> and <small>small text</small>.
```

**bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`,
<mark>highlight</mark> and <small>small text</small>.

## Paragraphs and line breaks

```md
A blank line starts a new paragraph.
A single line break is joined into the same line.

End a line with a backslash\
to force a line break.
```

A blank line starts a new paragraph.
A single line break is joined into the same line.

End a line with a backslash\
to force a line break.

## Links

```md
- [Inline link](https://github.com/hoangvd97)
- [With a title](https://github.com "GitHub")
- [Another post](/posts/hello-world.html)
- [A heading on this page](#lists)
- A bare URL: https://example.com
- A [reference link][gh]

[gh]: https://github.com
```

- [Inline link](https://github.com/hoangvd97)
- [With a title](https://github.com "GitHub")
- [Another post](/posts/hello-world.html)
- [A heading on this page](#lists)
- A bare URL: https://example.com
- A [reference link][gh]

[gh]: https://github.com

## Images

```md
![Alt text](/img/avatar.png)
```

A Markdown image is centered and fills the content width, up to its own size. Put image files in `public/img/` and link them as `/img/name.png`. To set a size, use HTML:

```md
<img src="/icon-192.png" alt="Icon" width="100">
```

<img src="/icon-192.png" alt="Icon" width="100">

## Lists

```md
- Unordered item
- Another item
  - Nested item (indent two spaces)

1. First
2. Second
   1. Nested (indent three spaces)

- [x] Done task
- [ ] Open task
```

- Unordered item
- Another item
  - Nested item (indent two spaces)

1. First
2. Second
   1. Nested (indent three spaces)

- [x] Done task
- [ ] Open task

## Blockquotes

```md
> A quote.
>
> A second paragraph in the same quote.
```

> A quote.
>
> A second paragraph in the same quote.

## Code

Inline code uses single backticks: `` `yarn dev` `` → `yarn dev`. Blocks use three backticks plus a language for highlighting:

````md
```js
const greet = (name) => `Hello, ${name}!`
console.log(greet('World')) // Hello, World!
```
````

```js
const greet = (name) => `Hello, ${name}!`
console.log(greet('World')) // Hello, World!
```

Supported languages include `bash`, `c`, `cpp`, `csharp`, `css`, `diff`, `go`, `graphql`, `java`, `js`/`javascript`, `json`, `kotlin`, `markdown`, `php`, `python`, `ruby`, `rust`, `scss`, `shell`, `sql`, `swift`, `ts`/`typescript`, `xml`/`html` and `yaml`. Without a language the block is plain text.

## Tables

```md
| Left | Center | Right |
| :--- | :----: | ----: |
| a    |   b    |     c |
| 1    |   2    |     3 |
```

| Left | Center | Right |
| :--- | :----: | ----: |
| a    |   b    |     c |
| 1    |   2    |     3 |

The colons in the second row set the alignment of each column.

## Horizontal rule

```md
---
```

---

## Footnotes

```md
A claim that needs a source.[^1]

[^1]: The note, listed at the end of the post.
```

A claim that needs a source.[^1]

[^1]: The note, listed at the end of the post.

## Emoji

```md
:tada: :+1: :rocket: :octocat:
```

:tada: :+1: :rocket: :octocat:

## Chat bubbles

A bubble comments on the paragraph above it. Write it as its own paragraph, with a blank line before and after.

```md
Hi, I'm Hoang.

<span class="bubble-left">A reply on the left.</span>

<span class="bubble-right">A reply on the right.</span>
```

Hi, I'm Hoang.

<span class="bubble-left">A reply on the left.</span>

<span class="bubble-right">A reply on the right.</span>

Add `data-name` to show who is speaking. The avatar shows the first letter of the name; hover over it (or tap it on a phone) to see the full name.

```md
<span class="bubble-left" data-name="Vu">Nice post!</span>

<span class="bubble-right" data-name="Hoang">Thanks!</span>
```

<span class="bubble-left" data-name="Vu">Nice post!</span>

<span class="bubble-right" data-name="Hoang">Thanks!</span>

Markdown such as `**bold**` or `[links](…)` works inside a bubble.

## HTML and escaping

Any HTML tag can be used in a post, e.g. `<br>`, `<sub>`, `<sup>` or an `<iframe>` embed (which fills the content width).

To show a Markdown character literally, put a backslash before it: `\*not italic\*` → \*not italic\*.
