'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { getUI } from '@/lib/i18n'
import type { ContentItem } from '@/lib/content'

type GalleryProps = {
  photos: ContentItem[]
}

export default function Gallery({ photos }: GalleryProps) {
  const { locale } = useLanguage()
  const t = getUI(locale)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Close lightbox with Escape
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') {
        setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length))
      }
      if (e.key === 'ArrowLeft') {
        setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, photos.length])

  // Lock scroll when open
  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [openIndex])

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  )

  const heading = locale === 'ar' ? 'معرض الصور' : 'Galerie'
  const empty = locale === 'ar' ? 'لا توجد صور حالياً.' : 'Aucune photo pour le moment.'

  if (photos.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8 text-asez-ink">{heading}</h1>
        <p className="text-asez-muted text-center py-16">{empty}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-asez-ink">{heading}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.slug}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-asez-bg focus:outline-none focus:ring-2 focus:ring-asez-orange"
          >
            {photo.image ? (
              <img
                src={photo.image}
                alt={photo.title ?? ''}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-asez-muted text-xs">
                {photo.title ?? ''}
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            {photo.title && (
              <span className="absolute bottom-2 start-2 end-2 text-white text-xs font-medium drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-start line-clamp-2">
                {photo.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 end-4 text-white/80 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous"
              className="absolute start-2 md:start-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rtl:rotate-180"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {photos[openIndex].image && (
              <img
                src={photos[openIndex].image}
                alt={photos[openIndex].title ?? ''}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
            {photos[openIndex].title && (
              <p className="text-white text-sm mt-3 text-center max-w-2xl">
                {photos[openIndex].title}
                {photos[openIndex].description && (
                  <span className="block text-white/70 mt-1">
                    {photos[openIndex].description}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next"
              className="absolute end-2 md:end-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rtl:rotate-180"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  )
}