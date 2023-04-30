import * as React from "react"

import { cn } from "../classname-utils"
import { useFormControl, IInputProps, InputOmittedType } from "../form"

type TextareaHTMLAttributes<T = HTMLTextAreaElement> = Omit<
  React.TextareaHTMLAttributes<T>,
  InputOmittedType
>

export type TextareaProps<T = HTMLTextAreaElement> = IInputProps<T> &
  TextareaHTMLAttributes<T> &
  React.RefAttributes<T>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      size = "md",
      as: Comp = "textarea",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      className,
      variant = "solid",
      id,
      rows = "4",
      ...rest
    } = props

    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    }

    const variantClasses = {
      solid: cn(
        "text-theme-900 bg-theme-50 rounded-lg border border-theme-300 focus:ring-theme-500 focus:border-theme-500 dark:bg-theme-700 dark:border-theme-600 dark:placeholder-theme-400 dark:text-white dark:focus:ring-theme-500 dark:focus:border-theme-500",
      ),
      plain: cn(
        " appearance-none outline-none focus:outline-none border-none focus:border-none hover:border-none focus:ring-0 text-theme-900 invalid:text-red-500 bg-white dark:bg-theme-900 text-theme-800 dark:text-theme-200",
      ),
    }

    const classes = cn(
      "block p-2.5 w-full ",
      variantClasses[variant],
      sizeClasses[size],
      className,
    )

    const { readOnly, disabled, invalid, required, ...formControl } =
      useFormControl(props)

    return (
      <Comp
        ref={ref}
        readOnly={readOnly}
        aria-readonly={readOnly}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        required={required}
        aria-required={required}
        aria-describedby={ariaDescribedby}
        className={classes}
        rows={rows}
        id={id || formControl.id}
        {...rest}
      />
    )
  },
)
