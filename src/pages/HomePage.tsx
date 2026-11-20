import { useEffect, useState } from "react"
import { BookCard } from "../components/BookCard"
import { searchBooks } from "../utils/api"
import type { Book } from "../types"
import { useDebounce } from "../hooks/useDebounce"
import { BookCardSkeleton } from "../components/BookCardSkeleton"

type Status = "idle" | "loading" | "success" | "error"

function App() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query)
  const [books, setBooks] = useState<Book[]>([])
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    const trimmed = debouncedQuery.trim()

    if (!trimmed) {
      setBooks([])
      setStatus("idle")
      return
    }

    const controller = new AbortController()
    setStatus("loading")

    searchBooks(trimmed, controller.signal)
      .then((results) => {
        setBooks(results)
        setStatus("success")
      })
      .catch((error) => {
        if (error.name === "AbortError") return
        setStatus("error")
      })

    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
          Shelf 📚
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Find your next favorite book.
        </h1>
        <p className="mt-4 text-lg text-neutral-500">
          Search millions of books, and save the ones you love.
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <input
            type="search"
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full bg-white px-6 py-4 text-base shadow-sm outline-none ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:shadow-md focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {status === "idle" && (
          <p className="mt-16 text-neutral-400">
            Search for a title or author to begin 📚
          </p>
        )}

        {status === "loading" && (
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="mt-16 text-red-400">
            Something went wrong. Please try again. 😕
          </p>
        )}

        {status === "success" && books.length === 0 && (
          <p className="mt-16 text-neutral-400">
            No books found for "{query}" 🔍
          </p>
        )}

        {status === "success" && books.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-6 text-left sm:grid-cols-3 md:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App