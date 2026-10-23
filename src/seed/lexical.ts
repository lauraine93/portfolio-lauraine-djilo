/** Fabrique un contenu Lexical (texte enrichi Payload) à partir de paragraphes simples. */

type Node = Record<string, unknown>

const text = (value: string): Node => ({ type: 'text', text: value, format: 0, detail: 0, mode: 'normal', style: '', version: 1 })

const base = { format: '', indent: 0, version: 1, direction: 'ltr' as const }

export const p = (value: string): Node => ({ ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(value)] })
export const h2 = (value: string): Node => ({ ...base, type: 'heading', tag: 'h2', children: [text(value)] })
export const h3 = (value: string): Node => ({ ...base, type: 'heading', tag: 'h3', children: [text(value)] })
export const ul = (items: string[]): Node => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((item, i) => ({ ...base, type: 'listitem', value: i + 1, children: [text(item)] })),
})

export const doc = (...children: Node[]) => ({ root: { ...base, type: 'root', children } })
