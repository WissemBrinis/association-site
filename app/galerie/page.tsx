import { getContentFiles } from '@/lib/content'
import Gallery from '@/components/Gallery'

export const metadata = {
  title: 'Galerie — ASEZ',
  description: 'Découvrez les photos des activités de l\'ASEZ.',
}

export default function GaleriePage() {
  const photos = getContentFiles('galerie')

  return (
    <main className="py-16 px-4 max-w-6xl mx-auto">
      <Gallery photos={photos} />
    </main>
  )
}