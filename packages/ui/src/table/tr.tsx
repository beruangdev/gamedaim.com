import * as React from "react"
import { cn } from "../classname-utils"

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isTitle?: boolean
}

export const Tr = React.forwardRef<HTMLTableRowElement, TrProps>(
  (props, ref) => {
    const { className, isTitle = false, ...rest } = props

    const classes = cn(
      "border-b border-border/50 hover:bg-background/50",
      isTitle &&
        "rounded-md bg-background/50 text-sm font-medium uppercase leading-normal text-foreground/60",
      className,
    )
    return <tr className={classes} ref={ref} {...rest} />
  },
)
