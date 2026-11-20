export function BookCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* cover placeholder */}
      <div className="aspect-2/3 rounded-2xl bg-neutral-200" />

      {/* title line */}
      <div className="mt-3 h-3 w-3/4 rounded-full bg-neutral-200" />

      {/* author line */}
      <div className="mt-2 h-3 w-1/2 rounded-full bg-neutral-200" />
    </div>
  )
}