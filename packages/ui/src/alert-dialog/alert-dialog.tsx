"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "../classname-utils"
import { VariantProps } from "../type-utils"

const buttonVarinatClasses = {
  outline:
    "shadow-sm text-theme-700 hover:text-white border border-theme-700 hover:bg-theme-800 focus:ring-4 focus:ring-theme-300  dark:border-theme-500 dark:text-theme-500 dark:hover:text-white dark:hover:bg-theme-600 dark:focus:ring-theme-800",
  solid:
    "shadow-sm text-white bg-theme-700 hover:bg-theme-800 focus:ring-4 focus:ring-theme-300 dark:bg-theme-600 dark:hover:bg-theme-700 dark:focus:ring-theme-800",
  ghost:
    "text-theme-900 bg-transparent hover:bg-theme-100 dark:bg-transparent dark:text-theme-50 dark:hover:border-theme-300 dark:hover:bg-theme-700 dark:active:bg-theme-600 dark:active:border-theme-400 focus:ring-4 focus:ring-theme-300 dark:focus:ring-theme-800",
  link: "h-auto p-0 leading-normal text-theme-600 hover:underline active:text-theme-700 dark:text-theme-200 dark:active:text-theme-600",
  "solid-primary":
    "shadow-sm text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
  "solid-danger":
    "shadow-sm text-white bg-danger-700 hover:bg-danger-800 focus:ring-4 focus:ring-danger-300 dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800",
  "ghost-primary":
    "text-primary-900 bg-transparent hover:bg-primary-100 dark:bg-transparent dark:text-primary-50 dark:hover:border-primary-300 dark:hover:bg-primary-700 dark:active:bg-primary-600 dark:active:border-primary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800",
  "outline-primary":
    "shadow-sm text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300  dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600 dark:focus:ring-primary-800",
}

export const AlertDialog = AlertDialogPrimitive.Root

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = (
  props: AlertDialogPrimitive.AlertDialogPortalProps,
) => {
  const { className, children, ...rest } = props

  return (
    <AlertDialogPrimitive.Portal className={cn(className)} {...rest}>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        {children}
      </div>
    </AlertDialogPrimitive.Portal>
  )
}

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        "bg-background/80 animate-in fade-in fixed inset-0 z-50 backdrop-blur-sm transition-opacity",
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </AlertDialogPrimitive.Overlay>
  )
})

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "bg-background animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:slide-in-from-bottom-0 fixed z-50 grid w-full max-w-lg scale-100 gap-4 border p-6 opacity-100 shadow-lg sm:rounded-lg md:w-full",
          className,
        )}
        {...rest}
      />
    </AlertDialogPortal>
  )
})

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export const AlertDialogHeader = (
  props: React.HTMLAttributes<HTMLDivElement>,
) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...rest}
    />
  )
}

AlertDialogHeader.displayName = "AlertDialogHeader"

export const AlertDialogFooter = (
  props: React.HTMLAttributes<HTMLDivElement>,
) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...rest}
    />
  )
}

AlertDialogFooter.displayName = "AlertDialogFooter"

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...rest}
    />
  )
})

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-muted-foreground text-sm", className)}
      {...rest}
    />
  )
})

AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> & {
  variant?:
    | VariantProps
    | "link"
    | "solid-primary"
    | "solid-danger"
    | "ghost-primary"
    | "outline-primary"
}

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>((props, ref) => {
  const { className, variant = "solid", ...rest } = props

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(buttonVarinatClasses[variant], className)}
      {...rest}
    />
  )
})

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
> & {
  variant?:
    | VariantProps
    | "link"
    | "solid-primary"
    | "solid-danger"
    | "ghost-primary"
    | "outline-primary"
}

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>((props, ref) => {
  const { className, variant = "solid", ...rest } = props

  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(buttonVarinatClasses[variant], "mt-2 sm:mt-0", className)}
      {...rest}
    />
  )
})

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
