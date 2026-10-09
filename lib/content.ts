import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, type Locale } from '@/lib/i18n'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title?: string
  date?: string
  date_start?: string
  date_end?: string
  image?: string
  excerpt?: string
  description?: string
  location?: string
  registration_required?: boolean
  registration_link?: string
  album?: string
  content: string
  [key: string]: unknown
}

export interface PageContent {
  title?: string
  address?: string
  phone?: string
  email?: string
  content: string
  [key: string]: unknown
}

function readFilesIn(dir: string): ContentItem[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(dir, filename)   // ← declared here
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      return {
        slug: filename.replace(/\.md$/, ''),
        content,
        ...data,
      } as ContentItem
    })
}

export function getContentFiles(
  folder: string,
  locale: Locale = defaultLocale
): ContentItem[] {
  const localizedDir = path.join(contentDirectory, folder, locale)
  const fallbackDir = path.join(contentDirectory, folder)

  const localized = readFilesIn(localizedDir)
  if (localized.length > 0) return localized

  return readFilesIn(fallbackDir)
}

export function getPageContent(
  name: string,
  locale: Locale = defaultLocale
): PageContent | null {
  const localizedPath = path.join(contentDirectory, 'pages', locale, `${name}.md`)
  const fallbackPath = path.join(contentDirectory, 'pages', `${name}.md`)

  const filePath = fs.existsSync(localizedPath) ? localizedPath : fallbackPath  // ← declared here
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return { content, ...data } as PageContent
}