import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="flex w-full">
      <div className="hidden w-[250px] px-3 lg:block">
        <div className="p-5">
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
      <div className="w-full lg:w-[calc(100%-250px)]">
        <div className="my-8 mt-16 grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
          <div className="rounded-md p-5 shadow-md">
            <Skeleton className="mb-6 h-4 w-4" />
            <Skeleton className="mb-2 h-6 w-6" />
            <Skeleton className="h-3 w-2/4" />
          </div>
        </div>
      </div>
    </div>
  )
}
