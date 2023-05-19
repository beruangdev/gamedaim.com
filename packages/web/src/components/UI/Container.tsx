import * as React from "react"

import { cn } from "@/utils/classname"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { className, children, ...rest } = props

    const classes = cn("container mx-auto py-4 w-full", className)

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  },
)
