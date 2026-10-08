import { getContentFiles } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const news = getContentFiles('actualites')
  return news.map(item => ({ slug: item.slug }))
}

export default function NewsPage({ params }: { params: { slug: string } }) {
  const news = getContentFiles('actualites')
  const item = news.find(n => n.slug === params.slug)

  if (!item) notFound()

  return (
    <main className="py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-500 mb-8">{item.date}</p>
      {item.image && (
        <img src={item.image} alt={item.title} className="w-full rounded-lg mb-8" />
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
    </main>
  )
}