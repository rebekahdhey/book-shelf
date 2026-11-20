
import type { Book } from "../types"

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { title, author, year, coverUrl } = book

  return (
    <article className="group">
      {/* Cover */}
      <div className="aspect-2/3 overflow-hidden rounded-2xl bg-neutral-200 shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-neutral-200 to-neutral-300 p-4 text-center text-sm font-medium text-neutral-500">
            {title}
          </div>
        )}
      </div>

      {/* Title and author */}
      <div className="mt-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {title}
        </h3>

        <p className="mt-0.5 text-xs text-neutral-500">
          {author}
          {year && <span> · {year}</span>}
        </p>
      </div>
    </article>
  )
}
