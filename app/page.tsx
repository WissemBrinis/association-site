import Link from 'next/link'
import { getContentFiles } from '@/lib/content'
export default function Home() {
  const news = getContentFiles('actualites').slice(0, 3)
  const events = getContentFiles('evenements').slice(0, 3)

  return (
    <main className="min-h-screen">
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Association
          </h1>
          <p className="text-xl mb-8">
            Ensemble pour un avenir meilleur
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/activites"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Nos activités
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Dernières actualités</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link
                key={item.slug}
                href={`/actualites/${item.slug}`}
                className="block p-6 border rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title ?? 'Sans titre'}
                </h3>
                <p className="text-gray-600">{item.excerpt ?? ''}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Prochains événements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((item) => (
                <div
                  key={item.slug}
                  className="p-6 border rounded-lg bg-white"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title ?? 'Sans titre'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.date_start ?? ''}
                  </p>
                  <p className="mt-2 text-gray-600">
                    {item.description ?? ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}