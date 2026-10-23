'use client'

import React from 'react'

export function SetupButton() {
  const [state, setState] = React.useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const run = async () => {
    setState('running')
    try {
      const res = await fetch('/api/setup/seed', { method: 'POST', credentials: 'include' })
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(body.error || `Erreur ${res.status}`)
      setState('done')
      setTimeout(() => window.location.reload(), 1200)
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
      <button type="button" className="btn btn--style-primary btn--size-medium" onClick={run} disabled={state === 'running' || state === 'done'} style={{ margin: 0 }}>
        {state === 'running' ? 'Installation en cours… (jusqu’à une minute)' : 'Installer le contenu de départ'}
      </button>
      <span role="status">
        {state === 'done' ? 'C’est fait ! Rechargement…' : null}
        {state === 'error' ? `Échec : ${message}` : null}
      </span>
    </div>
  )
}

export default SetupButton
