import * as React from "react"

import { useFormControl } from "./FormControl"
import { cn } from "@/utils/classname"

export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>((props, ref) => {
  const { className, id, ...rest } = props

  const formControl = useFormControl({})

  return (
    <div
      ref={ref}
      className={cn(
        "text-danger mt-1.5 flex items-center text-sm leading-none",
        className,
      )}
      id={id || formControl.errorId}
      {...rest}
    />
  )
})
