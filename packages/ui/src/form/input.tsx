import * as React from "react"

import { cn } from "../classname-utils"
import { SizesProps } from "../type-utils"
import { useFormControl } from "./form-control"

type InputSizes = Exclude<SizesProps, "base">

export type InputElementSizes = Exclude<
  SizesProps,
  "base" | "2xl" | "3xl" | "4xl"
>

export interface IInputProps<T = HTMLInputElement> {
  disabled?: React.InputHTMLAttributes<T>["disabled"]
  invalid?: boolean
  required?: React.InputHTMLAttributes<T>["required"]
  readOnly?: React.InputHTMLAttributes<T>["readOnly"]
  variant?: "solid" | "plain"
  size?: InputSizes
  as?: React.ElementType
  type?: string
  "aria-label"?: string
  "aria-describedby"?: string
}

export type InputOmittedType =
  | "size"
  | "disabled"
  | "required"
  | "checked"
  | "defaultChecked"
  | "readOnly"

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  InputOmittedType
>

export type InputProps<T = HTMLElement> = IInputProps &
  InputHTMLAttributes &
  React.RefAttributes<T>

export const Input = React.forwardRef<HTMLElement, InputProps>((props, ref) => {
  const {
    size = "md",
    as: Comp = "input",
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    className,
    variant = "solid",
    type = "text",
    id,
    ...rest
  } = props

  const { readOnly, disabled, invalid, required, ...formControl } =
    useFormControl(props)

  const sizeClasses = {
    xs: "h-7 text-xs",
    sm: "h-8 text-sm",
    md: "h-9 text-base",
    lg: "h-11 text-lg",
    xl: "h-[3.125rem] text-xl",
    "2xl": "h-14 text-2xl",
    "3xl": "h-15 text-3xl",
    "4xl": "h-16 text-4xl",
    "5xl": "h-17 text-5xl",
  }

  const variantClasses = {
    plain: cn(
      "relative w-full min-w-0 inline-flex px-3 items-center appearance-none outline-none focus:outline-none border-none focus:border-none hover:border-none focus:ring-0 text-theme-900 invalid:text-red-500 bg-white dark:bg-theme-900 text-theme-800 dark:text-theme-200",
      disabled &&
        "disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:border-theme-200 disabled:bg-theme-200 dark:disabled:border-transparent dark:disabled:bg-theme-200",
    ),
    solid: cn(
      "relative rounded-md w-full min-w-0 inline-flex px-3 items-center appearance-none focus:outline-none transition-colors duration-75 ease-out border border-theme-300 text-theme-900 bg-theme-50 hover:bg-theme-50 focus:bg-white invalid:border-1 invalid:border-red-500 invalid:ring-red-600 focus:ring-2 dark:border-theme-600 dark:text-theme-200 dark:bg-theme-900 dark:hover:bg-theme-800 dark:focus:bg-theme-800 dark:invalid:border-1 dark:invalid:border-red-700 dark:invalid:ring-offset-2 dark:invalid:ring-red-700",
      disabled &&
        "disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:border-theme-200 disabled:bg-theme-200 dark:disabled:border-transparent dark:disabled:bg-theme-200",
    ),
  }

  const classes = cn(
    sizeClasses[size],
    variantClasses[variant],
    disabled &&
      "disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:border-theme-200 disabled:bg-theme-200 dark:disabled:border-transparent dark:disabled:bg-theme-200",
  )

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
      className={cn(classes, className)}
      type={type}
      id={id || formControl.id}
      {...rest}
    />
  )
})
