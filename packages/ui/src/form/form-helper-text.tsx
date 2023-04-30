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

  const classes = cn(
    "mt-1.5 text-xs text-theme-500 dark:text-theme-600",
    className,
  )
  const formControl = useFormControl({})

  return (
    <Comp
      ref={ref}
      className={classes}
      id={id || formControl.helpTextId}
      {...rest}
    />
  )
})
