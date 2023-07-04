import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
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
  )
}
