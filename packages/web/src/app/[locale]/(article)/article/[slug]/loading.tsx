import { Skeleton } from "@/components/UI/Skeleton"

export default function LoadingIndex() {
  return (
    <div className="mt-10 w-full lg:px-4">
      <div className="flex w-full">
        <div className="w-full px-3 lg:w-8/12">
          {/* Categories Skeleton */}
          <div className="mb-2">
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
          {/* Title Skeleton */}
          <div className="my-4">
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Featured Image Skeleton */}
          <div className="mb-2">
            <Skeleton className="aspect-video w-full" />
          </div>
          {/* Content Skeleton */}
          <div className="flex">
            <div className="hidden w-16 px-2 lg:block">
              <Skeleton className="mb-1 h-10 w-12 rounded" />
              <Skeleton className="mb-1 h-10 w-12 rounded" />
              <Skeleton className="mb-1 h-10 w-12 rounded" />
              <Skeleton className="mb-1 h-10 w-12 rounded" />
            </div>
            <div className="w-full lg:w-[calc(100%-64px)]">
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-full" />
            </div>
          </div>
        </div>
        <div className="hidden w-4/12 px-4 lg:block">
          {/* Post Card Side Skeleton */}
          <div className="rounded-xl border p-4">
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="mb-4 flex w-full border-separate flex-row">
              <Skeleton className="mr-2 h-[75px] w-[75px]" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
