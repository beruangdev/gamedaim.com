import * as React from "react"

import { cn } from "../classname-utils"
import { useFormControl } from "../form"
import { VisuallyHidden } from "../visually-hidden"

export interface SwitchProps<T = HTMLInputElement> {
  className?: string
  disabled?: React.InputHTMLAttributes<T>["disabled"]
  invalid?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  id?: string
  name?: string
  value?: string | number
  size?: "sm" | "md"
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-labelledby"?: string
  children?: React.ReactNode
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      defaultChecked,
      checked,
      size = "md",
      onChange,
      className,
      ...rest
    } = props

    const { disabled, invalid } = useFormControl(props)

    const sizeClasses = {
      sm: "h-4 w-7 after:h-3 after:w-3",
      md: "h-6 w-11 after:h-5 after:w-5",
    }

    const classes = cn(
      "bg-theme-200 rounded-full accent-theme-500 peer peer-focus:ring-4 peer-focus:ring-theme-300 dark:peer-focus:ring-theme-800 dark:bg-theme-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-theme-300 after:border after:rounded-full  after:transition-all dark:border-theme-600 peer-checked:bg-theme-600",
      sizeClasses[size],
      disabled && "opacity-60 cursor-not-allowed",
      className,
    )

    return (
      <label
        className={cn("relative mb-4 inline-flex cursor-pointer items-center")}
        {...rest}
      >
        <input
          type="checkbox"
          value=""
          id="default-toggle"
          className={cn("peer sr-only")}
        />
        <VisuallyHidden
          as="input"
          type="checkbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={invalid}
          defaultChecked={defaultChecked}
          onChange={onChange}
          checked={checked}
          data-disabled={disabled}
          disabled={disabled}
          className="peer sr-only"
        />
        <div className={classes} data-disabled={disabled}></div>
      </label>
    )
  },
)
