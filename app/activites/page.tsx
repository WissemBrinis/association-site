import { getPageContent } from '@/lib/content'

export default function ActivitesPage() {
  const page = getPageContent('activites')

  return (
    <main className="py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        {page?.title ?? 'Nos activités'}
      </h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page?.content ?? '' }}
      />
    </main>
  )
}