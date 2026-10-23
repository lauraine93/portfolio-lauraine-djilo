'use client'

import React, { useActionState } from 'react'

import { sendMessage, type ContactState } from '@/app/(frontend)/[locale]/contact/actions'
import type { Locale } from '@/lib/locales'

import { ArrowRight } from './Icons'

type Labels = {
  name: string
  email: string
  subject: string
  message: string
  send: string
  sending: string
  success: string
  error: string
  required: string
}

export function ContactForm({ locale, subjects, labels }: { locale: Locale; subjects: string[]; labels: Labels }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: 'idle' })
  const err = state.fieldErrors ?? {}

  if (state.status === 'success') {
    return (
      <p role="status" className="form__success">
        {labels.success}
      </p>
    )
  }

  return (
    <form action={action} className="form" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="form__trap" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form__row">
        <div className="form__field">
          <label htmlFor="cf-name">
            {labels.name} <span className="form__req">({labels.required})</span>
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required aria-invalid={err.name || undefined} />
        </div>
        <div className="form__field">
          <label htmlFor="cf-email">
            {labels.email} <span className="form__req">({labels.required})</span>
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={err.email || undefined} />
        </div>
      </div>

      {subjects.length ? (
        <div className="form__field">
          <label htmlFor="cf-subject">{labels.subject}</label>
          <select id="cf-subject" name="subject" defaultValue={subjects[0]}>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="form__field">
        <label htmlFor="cf-message">
          {labels.message} <span className="form__req">({labels.required})</span>
        </label>
        <textarea id="cf-message" name="message" rows={6} required aria-invalid={err.message || undefined} />
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="form__error">
          {labels.error}
        </p>
      ) : null}

      <button type="submit" className="btn-arrow btn-arrow--primary btn-arrow--lg" disabled={pending}>
        <span>{pending ? labels.sending : labels.send}</span>
        <span className="btn-arrow__icon">
          <ArrowRight />
        </span>
      </button>
    </form>
  )
}
