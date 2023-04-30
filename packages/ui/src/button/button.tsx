import * as React from "react"

import { cn } from "../classname-utils"
import { SpinnerIcon } from "../icons"
import { SizesProps, VariantProps } from "../type-utils"

export type ButtonSizes = Exclude<SizesProps, "4xl" | "3xl" | "2xl" | "base">

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType
  loading?: boolean
  disabled?: boolean
  active?: boolean
  loadingText?: string
  type?: "button" | "reset" | "submit"
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  size?: ButtonSizes
  variant?:
    | VariantProps
    | "link"
    | "solid-primary"
    | "solid-danger"
    | "ghost-primary"
    | "outline-primary"
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      as: Comp = "button",
      disabled: _disabled,
      loading,
      active,
      loadingText,
      type,
      leftIcon,
      rightIcon,
      children,
      className,
      variant = "solid",
      size = "md",
      ...rest
    } = props

    const disabled = _disabled || loading

    const variantClasses = {
      outline:
        "shadow-sm text-theme-700 hover:text-white border border-theme-700 hover:bg-theme-800 focus:ring-4 focus:ring-theme-300  dark:border-theme-500 dark:text-theme-500 dark:hover:text-white dark:hover:bg-theme-600 dark:focus:ring-theme-800",
      solid:
        "shadow-sm text-white bg-theme-700 hover:bg-theme-800 focus:ring-4 focus:ring-theme-300 dark:bg-theme-600 dark:hover:bg-theme-700 dark:focus:ring-theme-800",
      ghost:
        "text-theme-900 bg-transparent hover:bg-theme-100 dark:bg-transparent dark:text-theme-50 dark:hover:border-theme-300 dark:hover:bg-theme-700 dark:active:bg-theme-600 dark:active:border-theme-400 focus:ring-4 focus:ring-theme-300 dark:focus:ring-theme-800",
      link: "h-auto p-0 leading-normal text-theme-600 hover:underline active:text-theme-700 dark:text-theme-200 dark:active:text-theme-600",
      // with colorScheme
      "solid-primary":
        "shadow-sm text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
      "solid-danger":
        "shadow-sm text-white bg-danger-700 hover:bg-danger-800 focus:ring-4 focus:ring-danger-300 dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800",
      "ghost-primary":
        "text-primary-900 bg-transparent hover:bg-primary-100 dark:bg-transparent dark:text-primary-50 dark:hover:border-primary-300 dark:hover:bg-primary-700 dark:active:bg-primary-600 dark:active:border-primary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
      "outline-primary":
        "shadow-sm text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300  dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600 dark:focus:ring-primary-800",
    }

    const sizeClasses = {
      xs: "px-3 h-7 text-xs min-w-[1.75rem]",
      sm: "h-8 px-3.5 text-sm min-w-[2rem]",
      md: "h-9 px-4 text-base min-w-[2.5rem]",
      lg: "h-11 px-5 text-lg min-w-[2.75rem]",
      xl: "h-[3rem] px-6 text-xl min-w-[3rem]",
    }

    const classes = cn(
      "inline-flex flex-shrink-0 relative items-center justify-center align-middle rounded-md m-0 font-medium leading-tight transition-colors duration-75 ease-out outline-none appearance-none cursor-pointer focus:outline-none select-none whitespace-nowrap",
      sizeClasses[size],
      variantClasses[variant],
      disabled &&
        "disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )

    return (
      <Comp
        role="button"
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        data-active={active ? "true" : undefined}
        className={classes}
        {...rest}
      >
        {leftIcon && !loading ? leftIcon : null}
        {loading && (
          <SpinnerIcon
            className={cn(
              loadingText ? "relative" : "absolute",
              loadingText ? "mr-2" : "mr-0",
            )}
            size="sm"
          />
        )}
        {loading
          ? loadingText || <span className="opacity-0">{children}</span>
          : children}
        {rightIcon && !loading ? rightIcon : null}
      </Comp>
    )
  },
)
