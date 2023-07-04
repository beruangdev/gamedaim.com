import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="w-full lg:px-4">
      <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="w-full px-3 lg:w-8/12">
          {/* Breadcump Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-3 w-10/12" />
          </div>
          {/* Content Download Skeleton */}
          <div className="mb-4 p-7 shadow-md">
            <div className="flex">
              <div className="w-2/12">
                <Skeleton className="aspect-[1/1] w-full" />
              </div>
              <div className="ml-6 w-10/12">
                <Skeleton className="mb-2 h-8 w-10/12" />
                <Skeleton className="mb-1 h-5 w-40" />
                <Skeleton className="mb-1 h-5 w-40" />
                <Skeleton className="mt-12 h-10 w-[200px]" />
              </div>
            </div>
          </div>
          {/* Related Skeleton */}
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
