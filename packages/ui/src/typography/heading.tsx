import * as React from "react"
import { cn } from "../classname-utils"

import { SizesProps } from "../type-utils"
import { textSizeClasses } from "./styles"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType
  children?: React.ReactNode
  size?: SizesProps
  bold?: boolean | string
  medium?: boolean | string
  semibold?: boolean
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      as: Comp = "h1",
      className,
      size = "xl",
      semibold = true,
      bold = false,
      medium = false,
      children,
      ...rest
    } = props
    const classes = cn(
      "leading-normal text-theme-900 dark:text-theme-100 line-clamp-2",
      bold && "font-bold",
      medium && "font-medium",
      semibold && "font-semibold",
      textSizeClasses[size],
      className,
    )

    return (
      <Comp ref={ref} className={classes} {...rest}>
        {children}
      </Comp>
    )
  },
)
