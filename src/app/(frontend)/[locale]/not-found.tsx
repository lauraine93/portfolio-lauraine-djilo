import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className="container contact-page">
      <div className="contact-page__intro">
        <span className="cta__kicker">404</span>
        <h1 className="h2">
          Cette page n’existe pas <em className="hl">encore</em>.
        </h1>
        <p className="section-head__aside">This page does not exist yet.</p>
        <Link href="/fr" className="btn-outline">
          Retour à l’accueil · Back home
        </Link>
      </div>
    </section>
  )
}
