import * as React from "react"

import { cn } from "../classname-utils"

const DEFAULT_ORIENTATION = "horizontal"
const ORIENTATIONS = ["horizontal", "vertical"] as const

type Orientation = (typeof ORIENTATIONS)[number]

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  as?: React.ElementType
  orientation?: Orientation
  decorative?: boolean
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (props, ref) => {
    const {
      as: Comp = "hr",
      decorative,
      orientation: orientationProp = DEFAULT_ORIENTATION,
      className,
      ...domProps
    } = props

    const orientation = isValidOrientation(orientationProp)
      ? orientationProp
      : DEFAULT_ORIENTATION
    const ariaOrientation = orientation === "vertical" ? orientation : undefined
    const semanticProps = decorative
      ? { role: "none" }
      : { "aria-orientation": ariaOrientation, role: "separator" }
    const classes = cn(
      "border-0 opacity-70 border-[inherit]",
      orientation === "vertical"
        ? "border-l border-solid h-auto mx-2"
        : "border-b border-solid w-auto my-2",
      className,
    )

    return (
      <Comp
        {...semanticProps}
        data-orientation={orientation}
        className={classes}
        {...domProps}
        ref={ref}
      />
    )
  },
)

function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation)
}
