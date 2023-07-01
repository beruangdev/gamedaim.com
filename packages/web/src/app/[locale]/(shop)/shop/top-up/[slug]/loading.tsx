import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="w-full px-4">
      <div className="mb-4 w-full">
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="order-2 flex w-full flex-col gap-4 lg:order-1 lg:w-2/3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded border p-4">
              <Skeleton className="h-9 w-full pr-3" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 rounded border p-4">
              <div className="flex rounded p-4 shadow-md">
                <Skeleton className="h-7 w-7" />
                <div className="ml-2 flex w-full flex-col gap-1">
                  <Skeleton className="mb-1 h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
              <div className="flex rounded p-4 shadow-md">
                <Skeleton className="h-7 w-7" />
                <div className="ml-2 flex w-full flex-col gap-1">
                  <Skeleton className="mb-1 h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
              <div className="flex rounded p-4 shadow-md">
                <Skeleton className="h-7 w-7" />
                <div className="ml-2 flex w-full flex-col gap-1">
                  <Skeleton className="mb-1 h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
              <div className="flex rounded p-4 shadow-md">
                <Skeleton className="h-7 w-7" />
                <div className="ml-2 flex w-full flex-col gap-1">
                  <Skeleton className="mb-1 h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded  border">
            <Skeleton className="h-6 w-full max-w-[300px]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded border p-4">
              <Skeleton className="h-9 w-full pr-3" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded border p-4">
              <Skeleton className="h-10 w-full pr-3" />
            </div>
          </div>
          <div className="p-4">
            <Skeleton className="h-5 w-full max-w-[100px]" />
          </div>
        </div>
        <div className="order-1 mb-4 w-full lg:order-2 lg:w-1/3">
          <div className="p-4">
            <div className="mb-2 flex gap-2">
              <Skeleton className="h-[70px] w-[70px]" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
