import * as React from "react"
import { cn } from "../classname-utils"

export interface TdProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right" | "center"
}

export const Td = React.forwardRef<HTMLTableCellElement, TdProps>(
  (props, ref) => {
    const { className, align = "left", ...rest } = props

    const classes = cn(
      "py-3 px-6",
      align === "left" && "text-left",
      align === "right" && "text-right",
      align === "center" && "text-center",
      className,
    )
    return <td className={classes} ref={ref} {...rest} />
  },
)
