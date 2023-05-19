import * as React from "react"

import { Skeleton } from "@/components/UI/Skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col justify-center space-y-2">
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  )
}
