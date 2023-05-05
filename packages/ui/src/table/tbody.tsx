import * as React from "react"
import { cn } from "../classname-utils"

interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Tbody = React.forwardRef<HTMLTableSectionElement, TbodyProps>(
  (props, ref) => {
    const { className, ...rest } = props

    const classes = cn(
      "text-sm font-light text-theme-600 dark:text-theme-200",
      className,
    )
    return <tbody className={classes} ref={ref} {...rest} />
  },
)
