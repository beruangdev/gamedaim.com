import * as React from "react"

import { cn } from "../classname-utils"
import { Icon, CrossIcon } from "../icons"

export interface AlertCloseButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const AlertCloseButton = React.forwardRef<
  HTMLButtonElement,
  AlertCloseButtonProps
>(({ className }, ref) => {
  const classes = cn(
    "absolute right-4 cursor-pointer focus:outline-none text-theme-600 hover:text-theme-700 dark:text-theme-300 dark:hover:text-theme-400",
    className,
  )

  return (
    <button ref={ref} className={classes}>
      <Icon
        as={CrossIcon}
        label="x"
        className="inline-block h-4 w-4 fill-current align-text-bottom text-current"
      />
    </button>
  )
})

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  variant?: "solid" | "top-accent" | "left-accent"
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const { as: Comp = "div", variant = "subtle", className, ...rest } = props

    const variantClasses = {
      subtle:
        "rounded-md text-theme-900 bg-theme-500 dark:text-theme-300 dark:bg-theme-500/10",
      solid:
        "mb-4 rounded-lg p-4 text-sm text-theme-700 bg-theme-100 rounded-lg dark:bg-theme-200 dark:text-theme-800",
      "left-accent":
        "border-l-4 rounded-sm text-theme-700 bg-transparent border-theme-500 dark:bg-theme-200",
      "top-accent":
        "mb-4 p-4 flex border-t-4  border-theme-500 text-theme-700 bg-theme-100 dark:bg-theme-200",
    }

    const classes = cn(
      "flex w-full items-center px-4 py-3 relative overflow-hidden",
      variantClasses[variant],
      className,
    )

    return <Comp role="alert" ref={ref} className={classes} {...rest} />
  },
)
