'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getUI } from '@/lib/i18n'
import { useLanguage } from '@/lib/LanguageContext'

export default function NavigationBar() {
  const [open, setOpen] = useState(false)
  const { locale, toggle } = useLanguage()
  const t = getUI(locale)

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/association', label: t.nav.association },
    { href: '/activites', label: t.nav.activities },
    { href: '/secours', label: t.nav.rescue },
    { href: '/galerie', label: t.nav.gallery },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-asez-muted/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0"> <img src="/logo.png" alt="ASEZ" className="h-10 md:h-12 w-auto" /> </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-asez-ink">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-asez-orange transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-asez-orange text-asez-orange text-sm font-semibold hover:bg-asez-orange hover:text-white transition-colors"
          >
            <span>🌐</span>
            <span>{t.common.switchLanguage}</span>
          </button>

          <button
            type="button"
            aria-label={open ? t.common.closeMenu : t.common.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-asez-ink hover:bg-asez-bg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-asez-muted/10 bg-white">
          <ul className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-asez-ink hover:bg-asez-bg hover:text-asez-orange transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => { toggle(); setOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-asez-orange text-asez-orange font-semibold hover:bg-asez-orange hover:text-white transition-colors"
              >
                <span>🌐</span>
                <span>{t.common.switchLanguage}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}