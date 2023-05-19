"use client"

import * as React from "react"

import {
  HoverCard as InternalHoverCard,
  HoverCardProps,
  HoverCardTrigger,
  HoverCardContent,
} from "./hover-card"

interface HoverCard
  extends React.ForwardRefExoticComponent<
    HoverCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof HoverCardTrigger
  Content: typeof HoverCardContent
}

const HoverCard = InternalHoverCard as HoverCard

HoverCard.Trigger = HoverCardTrigger
HoverCard.Content = HoverCardContent

export { HoverCard, HoverCardTrigger, HoverCardContent }
