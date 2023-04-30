import * as React from "react"

import { cn } from "../classname-utils"
import { useFormControl } from "../form"
import { SizesProps } from "../type-utils"

type RadioSizes = Exclude<SizesProps, "4xl" | "3xl" | "2xl" | "base" | "xs">

export interface RadioProps<T = HTMLInputElement>
  extends React.HTMLAttributes<HTMLInputElement> {
  disabled?: React.InputHTMLAttributes<T>["disabled"]
  invalid?: boolean
  required?: React.InputHTMLAttributes<T>["required"]
  readOnly?: React.InputHTMLAttributes<T>["readOnly"]
  defaultChecked?: boolean
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  id?: string
  name?: string
  value?: string | number
  size?: RadioSizes
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-labelledby"?: string
  children?: React.ReactNode
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedby,
      defaultChecked,
      checked,
      size = "md",
      onChange,
      children,
      className,
      ...rest
    } = props

    const { disabled } = useFormControl(props)

    const radioLabelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    }

    const radioSizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    }

    const radioClasses = cn(
      "cursor-pointer shadow-sm bg-[currentColor] border-theme-300 text-theme-600 hover:text-theme-100 invalid:border-1 invalid:border-red-500 invalid:hover:border-1 invalid:hover:border-red-700 dark:border-theme-600 dark:text-theme-700 dark:hover:border-theme-300 dark:hover:text-theme-600 dark:invalid:border-1 dark:invalid:border-red-700 dark:invalid:hover:border-1 dark:invalid:hover:border-red-800 checked:border-transparent dark:focus:ring-offset-theme-900",
      radioSizeClasses[size],
      disabled ? "opacity-80" : "opacity-100",
      disabled &&
        "disabled:shadow-none disabled:border-theme-300 disabled:bg-theme-300 disabled:hover:text-theme-300 dark:disabled:border-transparent dark:disabled:bg-theme-200 dark:disabled:hover:text-theme-600",
      className,
    )

    const radioLabelClasses = cn(
      "ml-2 select-none text-sm text-theme-900 dark:text-theme-100",
      radioLabelSizeClasses[size],
      disabled ? "opacity-40" : "opacity-100",
      className,
    )

    return (
      <label
        className={cn(
          "inline-flex items-center align-top",
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          type="radio"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedby}
          id={id}
          ref={ref}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={radioClasses}
          {...rest}
        />
        {children && <span className={radioLabelClasses}>{children}</span>}
      </label>
    )
  },
)
