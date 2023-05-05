import * as React from "react"
import { cn } from "../classname-utils"

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isTitle?: boolean
}

export const Tr = React.forwardRef<HTMLTableRowElement, TrProps>(
  (props, ref) => {
    const { className, isTitle = false, ...rest } = props

    const classes = cn(
      "border-b border-theme-50 hover:bg-theme-50 dark:hover:bg-theme-700",
      isTitle &&
        "rounded-md bg-theme-50 dark:bg-theme-800 text-sm font-medium uppercase leading-normal text-theme-600 dark:text-theme-200",
      className,
    )
    return <tr className={classes} ref={ref} {...rest} />
  },
)
