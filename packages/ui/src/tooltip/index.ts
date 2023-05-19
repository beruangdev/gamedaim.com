"use client"

import * as React from "react"

import {
  Tooltip as InternalTooltip,
  TooltipProps,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip"

interface Tooltip
  extends React.ForwardRefExoticComponent<
    TooltipProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof TooltipTrigger
  Content: typeof TooltipContent
  Provider: typeof TooltipProvider
}

const Tooltip = InternalTooltip as Tooltip

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
Tooltip.Provider = TooltipProvider

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
