import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="w-full px-12 py-4">
      <div className="mb-10">
        <Skeleton className="my-6 h-10 w-full max-w-[500px]" />
      </div>
      <div className="flex flex-col gap-x-8 border-y py-12 md:flex-row">
        <div className="-mt-2 flex gap-8 md:mt-0">
          <Skeleton className="aspect-[4/6] h-32 w-auto sm:h-56" />
          <div className="w-[150px]">
            <Skeleton className="mb-1 h-4 w-full max-w-[150px]" />
            <Skeleton className="mb-8 h-3 w-full max-w-[150px]" />
            <Skeleton className="mb-6 h-3 w-full max-w-[150px]" />
            <Skeleton className="mb-6 h-3 w-full max-w-[150px]" />
          </div>
        </div>
        <div className="w-full flex-1 pt-8 md:w-1/2 md:flex-auto md:pt-0">
          <div className="w-full pt-12 sm:pt-0">
            <Skeleton className="mb-1 h-4 w-full max-w-[150px]" />
            <Skeleton className="h-3 w-full max-w-[150px]" />
            <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t pt-8 md:gap-x-2">
              <Skeleton className="h-3 w-full max-w-[150px]" />
              <Skeleton className="h-3 w-full max-w-[150px]" />
              <Skeleton className="h-3 w-full max-w-[150px]" />
              <Skeleton className="h-3 w-full max-w-[150px]" />
            </div>
          </div>
          <div className="mt-8">
            <Skeleton className="h-4 w-full max-w-[160px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-[84px]">
        <Skeleton className="ml-2 h-4 w-full max-w-[160px]" />
        <Skeleton className="h-6 w-full max-w-[160px]" />
      </div>
    </div>
  )
}
