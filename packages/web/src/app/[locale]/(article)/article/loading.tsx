import { Skeleton } from "@/components/UI/Skeleton"

export default function LoadingIndex() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mt-10 w-full lg:px-4">
      <div className="flex w-full">
        {/* Post Card Skeleton */}
        <div className="w-full px-3 lg:w-8/12">
          <div className="mb-[30px] flex w-full justify-between lg:justify-start">
            <Skeleton className=" order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
            <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-4 h-20 w-40" />
            </div>
          </div>
          <div className="mb-[30px] flex w-full justify-between lg:justify-start">
            <Skeleton className=" order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
            <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-4 h-20 w-40" />
            </div>
          </div>
          <div className="mb-[30px] flex w-full justify-between lg:justify-start">
            <Skeleton className=" order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
            <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
              <Skeleton className="h-8 w-[200px] md:w-20" />
              <Skeleton className="mt-4 hidden h-20 w-40 md:block" />
            </div>
          </div>
          <div className="mb-[30px] flex w-full">
            <Skeleton className=" order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
            <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-4 h-20 w-40" />
            </div>
          </div>
          <div className="mb-[30px] flex w-full">
            <Skeleton className=" order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
            <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-4 h-20 w-40" />
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
