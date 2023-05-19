import * as React from "react"
import { cn } from "@/utils/classname"

interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Tbody = React.forwardRef<HTMLTableSectionElement, TbodyProps>(
  (props, ref) => {
    const { className, ...rest } = props

    const classes = cn("text-sm font-light text-foreground", className)
    return <tbody className={classes} ref={ref} {...rest} />
  },
)
