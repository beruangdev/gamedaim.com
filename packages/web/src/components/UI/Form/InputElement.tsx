import * as React from "react"

import { InputElementSizes } from "./Input"
import { VariantProps, cn, cva } from "@/utils/classname"

type Placement = "left" | "right"

export interface InputElementProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputElementVariants> {
  placement?: Placement
  size?: InputElementSizes
  children?: React.ReactNode
  disabledPointerEvents?: boolean
}

const inputElementVariants = cva(
  "z-10 absolute top-0 flex items-center justify-center",
  {
    variants: {
      size: {
        xs: "h-7 w-7 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-9 w-9 text-base",
        lg: "h-11 w-11 text-lg",
        xl: "h-[3.125rem] w-[3.125rem] text-xl",
      },
      disabledPointerEvents: {
        true: "pointer-events-none",
      },
    },
  },
)

export const InputElement = React.forwardRef<HTMLDivElement, InputElementProps>(
  (props, ref) => {
    const {
      size,
      children,
      placement = "left",
      disabledPointerEvents = false,
      className,
      ...rest
    } = props

    const placementProp = { [placement]: "0" }

    return (
      <div
        ref={ref}
        className={cn(
          inputElementVariants({ size, disabledPointerEvents, className }),
        )}
        style={placementProp}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export const InputLeftElement = React.forwardRef<
  HTMLDivElement,
  InputElementProps
>((props, ref) => <InputElement ref={ref} placement="left" {...props} />)

export const InputRightElement = React.forwardRef<
  HTMLDivElement,
  InputElementProps
>((props, ref) => <InputElement ref={ref} placement="right" {...props} />)
