import * as React from "react"

import { cn } from "../classname-utils"
import { SizesProps } from "../type-utils"
import { textSizeClasses } from "./styles"

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType
  children?: React.ReactNode
  size?: SizesProps
  lineClamp?: boolean | number
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const {
      as: Comp = "p",
      className,
      size = "base",
      lineClamp = false,
      ...rest
    } = props

    const classes = cn(
      "leading-normal text-theme-900 dark:text-theme-100",
      textSizeClasses[size],
      lineClamp && `line-clamp-${lineClamp}`,
      className,
    )

    return <Comp ref={ref} className={classes} {...rest} />
  },
)
