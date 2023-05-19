import * as React from "react"

import { Button as InternalButton, ButtonProps, buttonVariants } from "./Button"
import { ButtonGroup, ButtonGroupProps } from "./ButtonGroup"
import { IconButton, IconButtonProps } from "./IconButton"

interface Button
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  Group: typeof ButtonGroup
}

const Button = InternalButton as Button

Button.Group = ButtonGroup

export { Button, ButtonGroup, IconButton, buttonVariants }
export type { ButtonProps, ButtonGroupProps, IconButtonProps }
