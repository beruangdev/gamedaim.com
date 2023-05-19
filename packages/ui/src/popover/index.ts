"use client"

import * as React from "react"

import {
  Popover as InternalPopover,
  PopoverProps,
  PopoverTrigger,
  PopoverContent,
} from "./popover"

interface Popover
  extends React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof PopoverTrigger
  Content: typeof PopoverContent
}

const Popover = InternalPopover as Popover

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export { Popover, PopoverTrigger, PopoverContent }
