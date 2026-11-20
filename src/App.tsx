import { useState } from "react"
import { BookCard } from "./components/BookCard"
import { mockBooks } from "./data/mockBooks"


function App() {
  const [query ,setQuery] = useState("")

  const results = mockBooks.filter((books) => {
    const q = query.toLocaleLowerCase()
    return (
      books.title.toLocaleLowerCase().includes(q) ||
      books.author.toLocaleLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
          Shelf 📖
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Find your next favorite book.
        </h1>
        <p className="mt-4 text-lg text-neutral-500">
          Search millions of books, and save the ones you love.
        </p>

        <div
          className="mx-auto mt-10 max-w-xl">
            <input 
              className="w-full rounded-full bg-white px-6 py-4 text-base shadow-sm outline-none ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:shadow-md focus:ring-2 focus:ring-neutral-900" 
              type="search" 
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
        </div>

        {results.length === 0 ? (
          <p className="mt-16 text-neutral-400">
            No books found for "{query}" 🔍
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-6 text-left sm:grid-cols-3 md:grid-cols-4">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App