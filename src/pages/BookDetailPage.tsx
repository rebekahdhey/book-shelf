import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { getBookDetails } from "../utils/api"
import type { BookDetails } from "../types"

type Status = "loading" | "success" | "error"

function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<BookDetails | null>(null)
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()
    setStatus("loading")

    getBookDetails(id, controller.signal)
      .then((details) => {
        setBook(details)
        setStatus("success")
      })
      .catch((error) => {
        if (error.name === "AbortError") return
        setStatus("error")
      })

    return () => controller.abort()
  }, [id])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          to="/"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          ← Back to search
        </Link>

        {status === "loading" && (
          <div className="mt-8 animate-pulse md:flex md:gap-10">
            <div className="aspect-2/3 w-64 shrink-0 rounded-2xl bg-neutral-200" />
            <div className="mt-8 flex-1 md:mt-0">
              <div className="h-8 w-2/3 rounded-full bg-neutral-200" />
              <div className="mt-4 h-4 w-1/3 rounded-full bg-neutral-200" />
              <div className="mt-8 h-4 w-full rounded-full bg-neutral-200" />
              <div className="mt-3 h-4 w-5/6 rounded-full bg-neutral-200" />
              <div className="mt-3 h-4 w-2/3 rounded-full bg-neutral-200" />
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="mt-12 text-center text-red-400">
            We couldn't load this book. 😕
          </p>
        )}

        {status === "success" && book && (
          <div className="mt-8 md:flex md:gap-10">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-64 shrink-0 self-start rounded-2xl object-cover shadow-xl"
              />
            ) : (
              <div className="flex aspect-2/3 w-64 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-neutral-200 to-neutral-300 p-6 text-center font-medium text-neutral-500">
                {book.title}
              </div>
            )}

            <div className="mt-8 md:mt-0">
              <h1 className="text-4xl font-semibold tracking-tight">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-neutral-500">{book.author}</p>

              {book.firstPublished && (
                <p className="mt-1 text-sm text-neutral-400">
                  First published {book.firstPublished}
                </p>
              )}

              {book.subjects.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {book.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-6 whitespace-pre-line leading-relaxed text-neutral-700">
                {book.description ?? "No description available yet."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookDetailPage