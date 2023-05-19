import * as React from "react"

import { cn } from "@/utils/classname"

export const Skeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...rest}
    />
  )
}
