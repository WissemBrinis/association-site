'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { getUI } from '@/lib/i18n'
import type { ContentItem } from '@/lib/content'

type HomeContentProps = {
  news: { fr: ContentItem[]; ar: ContentItem[] }
  events: { fr: ContentItem[]; ar: ContentItem[] }
}

export default function HomeContent({ news, events }: HomeContentProps) {
  const { locale } = useLanguage()
  const t = getUI(locale)

  const newsList = (news[locale] ?? []).slice(0, 3)
  const eventsList = (events[locale] ?? []).slice(0, 3)

  const tagline =
    locale === 'ar'
      ? 'جمعية الاستغوار والتسلق بزغوان'
      : "Association de Spéléologie et d'Escalade de Zaghouan"

  const newsHeading = locale === 'ar' ? 'آخر الأخبار' : 'Dernières actualités'
  const eventsHeading = locale === 'ar' ? 'الأحداث القادمة' : 'Prochains événements'

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-asez-orange text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ASEZ</h1>
          <p className="text-xl mb-8">{tagline}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/activites"
              className="bg-white text-asez-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              {t.nav.activities}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      {newsList.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-asez-ink">{newsHeading}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <Link
                key={item.slug}
                href={`/actualites/${item.slug}`}
                className="block p-6 border rounded-lg hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold mb-2 text-asez-ink">
                  {item.title ?? ''}
                </h3>
                <p className="text-asez-muted">{item.excerpt ?? ''}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Events */}
      {eventsList.length > 0 && (
        <section className="py-16 px-4 bg-asez-bg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-asez-ink">{eventsHeading}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {eventsList.map((item) => (
                <div
                  key={item.slug}
                  className="p-6 border rounded-lg bg-white"
                >
                  <h3 className="text-xl font-semibold mb-2 text-asez-ink">
                    {item.title ?? ''}
                  </h3>
                  <p className="text-sm text-asez-muted mb-2">{item.date_start ?? ''}</p>
                  <p className="text-asez-muted">{item.description ?? ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}