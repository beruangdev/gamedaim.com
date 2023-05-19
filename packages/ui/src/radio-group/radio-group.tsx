"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "../classname-utils"
import { Icon } from "../icon"

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...rest}
      ref={ref}
    />
  )
})

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "border-input ring-offset-background focus:ring-ring h-4 w-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Icon.Circle className="fill-primary text-primary h-2.5 w-2.5" />
      </RadioGroupPrimitive.Indicator>
      {children}
    </RadioGroupPrimitive.Item>
  )
})
