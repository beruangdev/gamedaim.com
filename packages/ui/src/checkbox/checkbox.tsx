"use client"

import * as React from "react"

import { cn } from "../classname-utils"
import { useFormControl } from "../form"
import { useForkRef } from "../use-fork-ref"
import { SizesProps } from "../type-utils"

type CheckboxSizes = Exclude<SizesProps, "4xl" | "3xl" | "2xl" | "base" | "xs">

interface ICheckboxProps<T = HTMLInputElement> {
  disabled?: React.InputHTMLAttributes<T>["disabled"]
  invalid?: boolean
  required?: React.InputHTMLAttributes<T>["required"]
  readOnly?: React.InputHTMLAttributes<T>["readOnly"]
  indeterminate?: boolean
  defaultChecked?: boolean
  checked?: boolean
  id?: string
  name?: string
  value?: string | number
  size?: CheckboxSizes
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-labelledby"?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export type CheckboxProps = ICheckboxProps &
  React.HTMLAttributes<HTMLInputElement>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
      indeterminate,
      children,
      className,
      ...rest
    } = props

    const { disabled, invalid, readOnly } = useFormControl(props)

    const checkboxLabelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    }

    const checkboxLabelClasses = cn(
      "ml-2 select-none font-medium text-theme-900 dark:text-theme-300",
      checkboxLabelSizeClasses[size],
      readOnly || disabled ? "opacity-40" : "opacity-100",
      className,
    )

    const checkboxSizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    }

    const checkboxClasses = cn(
      "cursor-pointer rounded accent-current",
      "text-theme-600 bg-theme-100 border-theme-300 focus:ring-theme-500 dark:focus:ring-theme-600 dark:ring-offset-theme-800 focus:ring-2 dark:bg-theme-700 dark:border-theme-600",
      checkboxSizeClasses[size],
      disabled &&
        "disabled:shadow-none disabled:border-theme-300 disabled:bg-theme-300 disabled:hover:text-theme-300 dark:disabled:border-transparent dark:disabled:bg-theme-200 dark:disabled:hover:text-theme-200",

      readOnly || disabled ? "opacity-80" : "opacity-100",
      className,
    )

    const ownRef = React.useRef()
    const _ref = useForkRef(ownRef, ref)

    React.useEffect(() => {
      // @ts-ignore
      if (_ref.current) {
        // @ts-ignore
        _ref.current.indeterminate = Boolean(indeterminate)
      }
    }, [indeterminate, _ref])

    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center align-top",
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          type="checkbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedby}
          id={id}
          ref={_ref}
          name={name}
          value={value}
          onChange={readOnly ? undefined : onChange}
          defaultChecked={readOnly ? undefined : defaultChecked}
          checked={
            readOnly ? Boolean(checked) : defaultChecked ? undefined : checked
          }
          disabled={disabled}
          aria-disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-invalid={invalid}
          aria-checked={indeterminate ? "mixed" : checked}
          className={checkboxClasses}
          {...rest}
        />
        {children && <span className={checkboxLabelClasses}>{children}</span>}
      </label>
    )
  },
)
