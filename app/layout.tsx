import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/LanguageContext'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "ASEZ — Association de Spéléologie et d'Escalade de Zaghouan",
  description:
    "Découvrez les activités de spéléologie et d'escalade de l'association ASEZ à Zaghouan, Tunisie.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-asez-bg text-asez-ink antialiased">
        <LanguageProvider>
          <NavigationBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}