import * as React from "react"

import { cn } from "../classname-utils"

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  id?: string
  className?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { children, id, className, ...rest } = props

    return (
      <select
        id={id}
        className={cn(
          "border-theme-300 bg-theme-50 text-theme-900 focus:border-theme-500 focus:ring-theme-500 dark:border-theme-600 dark:bg-theme-700 dark:placeholder-theme-400 dark:focus:border-theme-500 dark:focus:ring-theme-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white",
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    )
  },
)
