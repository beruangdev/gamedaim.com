import * as React from "react"

import { cn, cva, VariantProps } from "@/utils/classname"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success:
          "text-success border-success/50 dark:border-success [&>svg]:text-success text-success",
        info: "text-info border-info/50 dark:border-info [&>svg]:text-info text-info",
        warning:
          "text-warning border-warning/50 dark:border-warning [&>svg]:text-warning text-warning",
        danger:
          "text-danger border-danger/50 dark:border-danger [&>svg]:text-danger text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const { className, variant, ...rest } = props

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...rest}
      />
    )
  },
)

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...rest}
    />
  )
})

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...rest}
    />
  )
})
