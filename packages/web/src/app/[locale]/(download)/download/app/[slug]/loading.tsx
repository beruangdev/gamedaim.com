import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="w-full lg:px-4">
      <div className="flex w-full">
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
                <div className="flex w-full space-x-2">
                  <Skeleton className="mt-12 h-10 w-[100px] md:w-[130px]" />
                  <Skeleton className="mt-12 h-10 w-[100px] md:w-[130px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-7">
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-1 h-3 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-2 p-7">
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5" />
              <div className="ml-3 w-full">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-3 w-full" />
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
