'use client'

import Link from 'next/link'
import { getUI } from '@/lib/i18n'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { locale } = useLanguage()
  const t = getUI(locale)
  const year = new Date().getFullYear()

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/association', label: t.nav.association },
    { href: '/activites', label: t.nav.activities },
    { href: '/secours', label: t.nav.rescue },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-asez-ink text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-lg font-bold text-asez-orange">ASEZ</p>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">{t.footer.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-asez-orange mb-3">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-asez-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-asez-orange mb-3">
            {t.footer.contactTitle}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📍 Zaghouan, Tunisie</li>
            <li>
              <a href="mailto:contact@asez.tn" className="hover:text-asez-orange transition-colors">
                ✉️ contact@asez.tn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-white/60 text-center">
          © {year} ASEZ. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}