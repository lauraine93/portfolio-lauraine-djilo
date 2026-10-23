'use client'

import type { TextFieldClientComponent } from 'payload'

import { FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui'
import React from 'react'

import { HEX_PATTERN } from '../../lib/color'

/** Champ couleur : pipette native + saisie hexadécimale, avec aperçu. */
export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError } = useField<string>({ path })
  const [draft, setDraft] = React.useState(value ?? '')

  React.useEffect(() => {
    setDraft(value ?? '')
  }, [value])

  const valid = HEX_PATTERN.test(draft)
  const label = typeof field.label === 'string' ? field.label : field.name

  return (
    <div className="field-type text" style={{ marginBottom: 'var(--base)', flex: '1 1 200px' }}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="color"
          aria-label={`${label} — pipette`}
          value={valid ? draft : '#000000'}
          onChange={(e) => {
            const v = e.target.value.toUpperCase()
            setDraft(v)
            setValue(v)
          }}
          style={{ width: 44, height: 40, padding: 2, border: '1px solid var(--theme-elevation-150)', borderRadius: 6, background: 'none', cursor: 'pointer' }}
        />
        <input
          type="text"
          aria-label={`${label} — code hexadécimal`}
          value={draft}
          placeholder="#2B1E3F"
          onChange={(e) => {
            const v = e.target.value.trim()
            setDraft(v)
            if (HEX_PATTERN.test(v)) setValue(v.toUpperCase())
          }}
          onBlur={() => {
            if (!HEX_PATTERN.test(draft)) setDraft(value ?? '')
          }}
          style={{
            flex: 1,
            height: 40,
            padding: '0 12px',
            fontFamily: 'ui-monospace, monospace',
            border: `1px solid ${showError || !valid ? 'var(--theme-error-500)' : 'var(--theme-elevation-150)'}`,
            borderRadius: 6,
            background: 'var(--theme-input-bg)',
            color: 'var(--theme-text)',
          }}
        />
      </div>
      <FieldError path={path} showError={showError} />
      {field.admin?.description ? <FieldDescription description={field.admin.description} path={path} /> : null}
    </div>
  )
}

export default ColorField
