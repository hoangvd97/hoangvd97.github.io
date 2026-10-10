// <span class="bubble-left" data-name="Hoang">…</span> becomes
// <span class="bubble-row bubble-row-left"><span class="bubble-avatar" data-name="Hoang" …>H</span><span class="bubble-left">…</span></span>
// so the speaker's avatar (the name's first letter; the full name shows on hover) sits beside the tail:
// before a left bubble, after a right one.
export default function rehypeBubbleNames() {
  return (tree) => wrap(tree)
}

function wrap(node) {
  node.children?.forEach((child, index) => {
    const side = ['left', 'right'].find((s) => child.properties?.className?.includes(`bubble-${s}`))
    const speaker = child.properties?.dataName?.trim()
    if (!side || !speaker) return wrap(child)

    delete child.properties.dataName
    const avatar = {
      type: 'element',
      tagName: 'span',
      // Focusable so a tap shows the name on touch screens, where there is no hover.
      properties: {
        className: ['bubble-avatar'],
        dataName: speaker,
        role: 'img',
        ariaLabel: speaker,
        tabIndex: 0,
      },
      children: [{ type: 'text', value: [...speaker.normalize('NFC')][0].toUpperCase() }],
    }
    node.children[index] = {
      type: 'element',
      tagName: 'span',
      properties: { className: ['bubble-row', `bubble-row-${side}`] },
      children: side === 'left' ? [avatar, child] : [child, avatar],
    }
  })
}
