"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { buttonVariants } from "./Button"
import { cn, VariantProps } from "@/utils/classname"

export type AlertDialogProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Root
>

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

type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> &
  VariantProps<typeof buttonVariants>
export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(buttonVariants(), className)}
      {...rest}
    />
  )
})

type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
> &
  VariantProps<typeof buttonVariants>

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className,
      )}
      {...rest}
    />
  )
})
