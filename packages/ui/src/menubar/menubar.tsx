"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { Icon } from "../icon"
import { cn } from "../classname-utils"

export const MenubarMenu = MenubarPrimitive.Menu

export const MenubarGroup = MenubarPrimitive.Group

export const MenubarPortal = MenubarPrimitive.Portal

export const MenubarSub = MenubarPrimitive.Sub

export const MenubarRadioGroup = MenubarPrimitive.RadioGroup

export type MenubarProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Root
>

export const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "bg-background flex h-10 items-center space-x-1 rounded-md border p-1",
        className,
      )}
      {...rest}
    />
  )
})

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
        className,
      )}
      {...rest}
    />
  )
})

export type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubTrigger
> & {
  inset?: boolean
}

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>((props, ref) => {
  const { className, inset, children, ...rest } = props

  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        inset && "pl-8",
        className,
      )}
      {...rest}
    >
      {children}
      <Icon.ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
})

export const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...rest}
    />
  )
})

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>((props, ref) => {
  const {
    className,
    align = "start",
    alignOffset = -4,
    sideOffset = 8,
    ...rest
  } = props

  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground animate-in slide-in-from-top-1 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...rest}
      />
    </MenubarPrimitive.Portal>
  )
})

type MenubarItemProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Item
> & {
  inset?: boolean
}

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>((props, ref) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...rest}
    />
  )
})

export const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>((props, ref) => {
  const { className, children, checked, ...rest } = props

  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Icon.Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
})

export const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Icon.Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
})

export const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>((props, ref) => {
  const { className, inset, ...rest } = props

  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...rest}
    />
  )
})

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("bg-muted -mx-1 my-1 h-px", className)}
      {...rest}
    />
  )
})

export const MenubarShortcut = (
  props: React.HTMLAttributes<HTMLSpanElement>,
) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...rest}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"
