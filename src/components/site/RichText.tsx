import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

/** Texte enrichi saisi dans le back-office (titres, listes, liens, gras…). */
export function RichText({ data, className = 'prose' }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return <LexicalRichText data={data as SerializedEditorState} className={className} />
}
