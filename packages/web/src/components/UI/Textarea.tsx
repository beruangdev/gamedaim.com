import * as React from "react"

import { cn } from "@/utils/classname"

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "solid" | "plain"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, variant = "solid", rows = 4, ...rest } = props

    const variantClasses = {
      solid: cn(
        "h-20 rounded-md w-full min-w-0 inline-flex p-2 items-center appearance-none focus:outline-none transition-colors duration-75 ease-out border border-input text-foreground bg-background hover:bg-background/80 invalid:border-1 invalid:border-danger invalid:ring-danger focus:ring-2 placeholder:text-muted-foreground",
      ),
      plain: cn(
        "appearance-none outline-none focus:outline-none border-none focus:border-none hover:border-none focus:ring-0 text-foreground invalid:text-danger bg-background",
      ),
    }
    return (
      <textarea
        className={cn(variantClasses[variant], className)}
        rows={rows}
        ref={ref}
        {...rest}
      />
    )
  },
)
