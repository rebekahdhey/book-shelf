import type {
  Book,
  BookDetails,
  OpenLibraryAuthor,
  OpenLibraryResponse,
  OpenLibraryWork,
} from "../types"

export async function searchBooks(
  query: string,
  signal: AbortSignal,
): Promise<Book[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query,
  )}&limit=20&fields=key,title,author_name,first_publish_year,cover_i`

  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  const data: OpenLibraryResponse = await res.json()

  return data.docs.map((doc) => ({
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown author",
    year: doc.first_publish_year ?? null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
  }))
}

export async function getBookDetails(
  id: string,
  signal: AbortSignal,
): Promise<BookDetails> {
  const res = await fetch(`https://openlibrary.org/works/${id}.json`, { signal })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  const work: OpenLibraryWork = await res.json()

  // Second fetch: look up the author's name
  let author = "Unknown author"
  const authorKey = work.authors?.[0]?.author.key
  if (authorKey) {
    const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`, {
      signal,
    })
    if (authorRes.ok) {
      const authorData: OpenLibraryAuthor = await authorRes.json()
      author = authorData.name
    }
  }

  // The description can be plain text, an object with a value, or missing
  const description =
    typeof work.description === "string"
      ? work.description
      : (work.description?.value ?? null)

  const coverId = work.covers?.[0]

  return {
    id,
    title: work.title,
    author,
    description,
    coverUrl: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null,
    subjects: (work.subjects ?? []).slice(0, 6),
    firstPublished: work.first_publish_date ?? null,
  }
}