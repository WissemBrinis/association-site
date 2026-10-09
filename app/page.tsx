// app/page.tsx (server)
import { getContentFiles } from '@/lib/content'
import HomeContent from '@/components/HomeContent'

export default function Home() {
  const news = {
    fr: getContentFiles('actualites', 'fr'),
    ar: getContentFiles('actualites', 'ar'),
  }
  const events = {
    fr: getContentFiles('evenements', 'fr'),
    ar: getContentFiles('evenements', 'ar'),
  }
  return <HomeContent news={news} events={events} />
}