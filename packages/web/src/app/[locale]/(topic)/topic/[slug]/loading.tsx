import { Skeleton } from "@/components/UI/Skeleton"

export default function LoadingIndex() {
  return (
    <div className="mt-10 w-full lg:px-4">
      <div className="flex w-full">
        {/* Post Card Skeleton */}
        <div className="w-full px-3 lg:w-8/12">
          <div className="mb-5 flex w-full overflow-hidden px-3">
            <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
            <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
            <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
          </div>
          <div className="flex space-x-4 overflow-hidden px-7">
            <div className="min-h-[350px] w-[200px] flex-col overflow-hidden rounded-lg shadow-lg">
              <Skeleton className="relative mb-3 h-[185px] w-[200px]" />
              <div className="px-3">
                <Skeleton className="h-5 w-full" />
                <div className="mt-3 flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
            <div className="min-h-[350px] w-[200px] flex-col overflow-hidden rounded-lg shadow-lg">
              <Skeleton className="relative mb-3 h-[185px] w-[200px]" />
              <div className="px-3">
                <Skeleton className="h-5 w-full" />
                <div className="mt-3 flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
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
