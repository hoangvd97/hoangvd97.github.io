// Keeps tables readable in the narrow content column:
// - each <table> is wrapped in <div class="table-scroll">, so a table wider than the
//   content scrolls sideways instead of squeezing its columns;
// - each cell's content is wrapped in <div class="cell">, which caps its width (CSS can't
//   cap a table cell itself), so long text wraps instead of widening the table without end;
// - inline code in cells may wrap after "_", "." and "/" (via <wbr>), so long values
//   like `:slightly_smiling_face:` or `Promise.allSettled` fit without breaking mid-word.
export default function rehypeTables() {
  return (tree) => wrapTables(tree)
}

function wrapTables(node) {
  node.children?.forEach((child, index) => {
    if (child.tagName !== 'table') return wrapTables(child)
    addBreakPoints(child)
    wrapCells(child)
    node.children[index] = {
      type: 'element',
      tagName: 'div',
      properties: { className: ['table-scroll'] },
      children: [child],
    }
  })
}

function wrapCells(node) {
  node.children?.forEach((child) => {
    if (child.tagName !== 'th' && child.tagName !== 'td') return wrapCells(child)
    child.children = [
      { type: 'element', tagName: 'div', properties: { className: ['cell'] }, children: child.children },
    ]
  })
}

function addBreakPoints(node, inCode = false) {
  node.children = node.children?.flatMap((child) => {
    if (child.type === 'element') {
      addBreakPoints(child, inCode || child.tagName === 'code')
      return [child]
    }
    if (!inCode || child.type !== 'text') return [child]
    return child.value.split(/(?<=[_./])(?=.)/).flatMap((part, i) => {
      const text = { type: 'text', value: part }
      return i ? [{ type: 'element', tagName: 'wbr', properties: {}, children: [] }, text] : [text]
    })
  })
}
