import * as React from "react"

import { cn } from "../classname-utils"
import { SizesProps, VariantProps } from "../type-utils"

export type BadgeSizes = Exclude<
  SizesProps,
  "4xl" | "3xl" | "2xl" | "xl" | "lg" | "base" | "xs"
>

export type BadgeVariant = Exclude<VariantProps, "ghost">

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType
  variant?: BadgeVariant
  size?: BadgeSizes
  hasShadow?: boolean
  // icon?: string | React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const {
      as: Comp = "span",
      variant = "solid",
      className,
      size = "md",
      hasShadow = false,
      // icon,
      children,
      ...rest
    } = props

    const sizeClasses = {
      sm: "text-xs font-medium px-2.5 py-0.5",
      md: "text-sm font-semibold px-2.5 py-0.5",
    }

    const variantClasses = {
      solid:
        "bg-theme-100 text-theme-800 dark:bg-theme-700 dark:text-theme-300",
      outline:
        "bg-transparent text-theme-800 border border-theme-600 dark:border-theme-600 dark:text-theme-300",
    }

    const classes = cn(
      "mr-2 inline-flex items-center rounded leading-4",
      variantClasses[variant],
      sizeClasses[size],
      hasShadow && "ring-2 ring-white dark:ring-black",
      className,
    )

    return (
      <Comp ref={ref} className={classes} {...rest}>
        {/* {icon ? icon : null} */}
        {children}
      </Comp>
    )
  },
)
