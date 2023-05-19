import * as React from "react"
import { VariantProps, cn, cva } from "@/utils/classname"

const tdVariants = cva("py-3 px-6", {
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

export interface TdProps
  extends React.HTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tdVariants> {}

export const Td = React.forwardRef<HTMLTableCellElement, TdProps>(
  (props, ref) => {
    const { className, align = "left", ...rest } = props

    return (
      <td
        className={cn(tdVariants({ align }), className)}
        ref={ref}
        {...rest}
      />
    )
  },
)
