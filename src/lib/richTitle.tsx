import React from 'react'

/**
 * Titres avec mot surligné : dans le back-office, on entoure le mot d'astérisques.
 * « Je suis *Lauraine Djilo*, UI/UX Product Designer. »
 */
export function RichTitle({ text, highlightClass }: { text?: string | null; highlightClass: string }) {
  if (!text) return null
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className={highlightClass}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}
