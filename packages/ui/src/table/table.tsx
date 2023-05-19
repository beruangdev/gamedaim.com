import * as React from "react"
import { cn } from "../classname-utils"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  isFixed?: boolean
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const { className, isFixed = false, ...rest } = props

    const classes = cn(
      "w-full",
      isFixed ? "table-fixed" : "table-auto",
      className,
    )
    return <table className={classes} ref={ref} {...rest} />
  },
)
