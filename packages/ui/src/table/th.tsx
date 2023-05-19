import * as React from "react"
import { VariantProps, cn, cva } from "../classname-utils"

const thVariants = cva("py-3 px-6", {
  variants: {
    align: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
})

export interface ThProps
  extends React.HTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof thVariants> {}

export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(
  (props, ref) => {
    const { className, align = "left", ...rest } = props

    return (
      <th
        className={cn(thVariants({ align }), className)}
        ref={ref}
        {...rest}
      />
    )
  },
)
