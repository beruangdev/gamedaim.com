import * as React from "react"

import { cn } from "../classname-utils"

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export const Code = React.forwardRef<HTMLElement, CodeProps>((props, ref) => {
  const { as: Comp = "code", className, ...rest } = props
  return (
    <Comp
      ref={ref}
      className={cn(
        "border-theme-100 bg-theme-200 text-theme-900 dark:border-theme-600 dark:bg-theme-700 dark:text-theme-300 inline-flex items-center justify-center break-all rounded-sm border px-px py-[3px] font-mono text-xs",
        className,
      )}
      {...rest}
    />
  )
})
