import Link from 'next/link'
import { getContentFiles } from '@/lib/content'

export default function ActualitesPage() {
  const news = getContentFiles('actualites')

  return (
    <main className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Actualités</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(item => (
          <Link key={item.slug} href={`/actualites/${item.slug}`} className="block border rounded-lg overflow-hidden hover:shadow-lg transition">
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <p className="text-gray-600">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}