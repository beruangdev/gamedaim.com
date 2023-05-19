"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/utils/classname"

export type HoverCardProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Root
>
export const HoverCard = HoverCardPrimitive.Root

export const HoverCardTrigger = HoverCardPrimitive.Trigger

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>((props, ref) => {
  const { className, align = "center", sideOffset = 4, ...rest } = props

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground animate-in zoom-in-90 z-50 w-64 rounded-md border p-4 shadow-md outline-none",
        className,
      )}
      {...rest}
    />
  )
})
