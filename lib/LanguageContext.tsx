'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { isRTL, type Locale, defaultLocale } from '@/lib/i18n'

type LanguageContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? localStorage.getItem('asez-locale') : null
    if (stored === 'fr' || stored === 'ar') {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = locale
    document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr'
    localStorage.setItem('asez-locale', locale)
  }, [locale])

  const setLocale = (l: Locale) => setLocaleState(l)
  const toggle = () => setLocaleState((prev) => (prev === 'fr' ? 'ar' : 'fr'))

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}