import * as React from "react"

import { cn } from "../classname-utils"
import { VisuallyHidden } from "../visually-hidden"
import { CrossIcon } from "./cross-icon"

export interface IconProps {
  as?: React.ElementType
  inline?: boolean
  role?: string
  color?: string
  height?: string
  width?: string
  label?: string
  className?: string
}

export const Icon = React.forwardRef<any, IconProps>((props, ref) => {
  const {
    as: Comp = CrossIcon,
    width,
    height,
    inline = true,
    className,
    role = "presentation",
    label,
    ...rest
  } = props

  const classes = cn(
    "text-black dark:text-theme-100",
    inline ? "inline-block align-middle" : "block",
    className,
  )

  return (
    <>
      <Comp
        ref={ref}
        height={height}
        width={width}
        className={classes}
        role={role}
        aria-hidden={true}
        focusable={false}
        {...rest}
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  )
})
