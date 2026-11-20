export type Book = {
  id: string
  title: string
  author: string
  year: number | null
  coverUrl: string | null
}

export type OpenLibraryDoc = {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
}

export type OpenLibraryResponse = {
  docs: OpenLibraryDoc[]
}

export type OpenLibraryWork = {
  title: string
  description?: string | { value: string }
  covers?: number[]
  subjects?: string[]
  first_publish_date?: string
  authors?: { author: { key: string } }[]
}

export type OpenLibraryAuthor = {
  name: string
}

export type BookDetails = {
  id: string
  title: string
  author: string
  description: string | null
  coverUrl: string | null
  subjects: string[]
  firstPublished: string | null
}