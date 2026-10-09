// components/HomeContent.tsx (client)
'use client'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { getUI } from '@/lib/i18n'
import type { ContentItem } from '@/lib/content'

export default function HomeContent({
  news,
  events,
}: {
  news: { fr: ContentItem[]; ar: ContentItem[] }
  events: { fr: ContentItem[]; ar: ContentItem[] }
}) {
  const { locale } = useLanguage()
  const t = getUI(locale)
  const newsList = news[locale].slice(0, 3)
  const eventsList = events[locale].slice(0, 3)
  // render...
}