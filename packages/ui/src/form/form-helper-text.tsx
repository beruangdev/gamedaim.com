import * as React from "react"

import { cn } from "../classname-utils"
import { useFormControl } from "./form-control"

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType
}

export const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>((props, ref) => {
  const { as: Comp = "p", className, id, ...rest } = props

  const formControl = useFormControl({})

  return (
    <Comp
      ref={ref}
      className={cn("text-foreground/80 mt-1.5 text-xs", className)}
      id={id || formControl.helpTextId}
      {...rest}
    />
  )
})
