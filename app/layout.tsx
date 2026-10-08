import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Association',
  description: 'Ensemble pour un avenir meilleur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  )
}