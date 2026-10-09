import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getContentFiles(folder: string, locale: string): ContentItem[] {
  const dir = path.join(contentDirectory, folder)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  return files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      content,
      ...data,
    } as ContentItem
  })
}

export function getPageContent(name: string): PageContent | null {
  const filePath = path.join(contentDirectory, 'pages', `${name}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    content,
    ...data,
  } as PageContent
}