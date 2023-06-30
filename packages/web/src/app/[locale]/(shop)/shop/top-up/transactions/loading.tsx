import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="w-full px-8 pt-2">
      <div className="mb-6">
        <Skeleton className="mb-1 h-4 w-3/4" />
        <Skeleton className="mb-10 h-4 w-2/4" />
        <Skeleton className="mb-2 h-2 w-1/4" />
        <Skeleton className="mb-6 h-9 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}
