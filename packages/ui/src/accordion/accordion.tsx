"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { Icon } from "../icon"
import { cn } from "../classname-utils"

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>
export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...rest}
    />
  )
})

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...rest}
      >
        {children}
        <Icon.ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all",
        className,
      )}
      {...rest}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
})
