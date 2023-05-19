import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { Icon } from "../icon"
import { cn, cva, VariantProps } from "../classname-utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        info: "bg-info text-info-foreground hover:bg-info/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        danger: "bg-danger text-danger-foreground hover:bg-danger/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      variant,
      loading = false,
      size,
      asChild = false,
      ...rest
    } = props
    const Comp = asChild ? Slot : "button"

    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          disabled
          ref={ref}
          {...rest}
        >
          <Icon.Spinner className="mr-2 h-4 w-4" />
          {children}
        </Comp>
      )
    } else {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...rest}
        >
          {children}
        </Comp>
      )
    }
  },
)
