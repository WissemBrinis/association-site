import { getPageContent } from '@/lib/content'

export default function ContactPage() {
  const page = getPageContent('contact')

  return (
    <main className="py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        {page?.title ?? 'Contact'}
      </h1>

      <div className="mb-8 space-y-2">
        {page?.address && (
          <p><strong>Adresse :</strong> {page.address}</p>
        )}
        {page?.phone && (
          <p><strong>Téléphone :</strong> {page.phone}</p>
        )}
        {page?.email && (
          <p>
            <strong>Email :</strong>{' '}
            <a href={`mailto:${page.email}`} className="text-blue-600 underline">
              {page.email}
            </a>
          </p>
        )}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page?.content ?? '' }}
      />
    </main>
  )
}