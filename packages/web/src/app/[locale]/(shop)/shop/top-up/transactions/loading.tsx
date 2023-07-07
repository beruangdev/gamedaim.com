import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[600px] w-full flex-col space-y-4 px-4 px-8 pt-2 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
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
