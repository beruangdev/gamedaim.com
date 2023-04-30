import * as React from "react"

import { cn } from "../classname-utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>((props, ref) => {
  const { className, ...rest } = props

  const classes = cn(
    "min-w-[1.25rem] bg-theme-100 text-theme-900 dark:bg-theme-300 dark:text-theme-300 inline-flex h-5 justify-center whitespace-nowrap rounded p-1 font-sans text-xs capitalize",
    className,
  )
  return <kbd ref={ref} className={classes} {...rest} />
})
