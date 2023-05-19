"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Icon } from "../icon"

import { cn } from "../classname-utils"

export type DialogProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

export const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => {
  const { className, children, ...rest } = props

  return (
    <DialogPrimitive.Portal className={cn(className)} {...rest}>
      <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        {children}
      </div>
    </DialogPrimitive.Portal>
  )
}

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "bg-background/80 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100",
        className,
      )}
      {...rest}
    />
  )
})

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "bg-background animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid w-full gap-4 rounded-b-lg border p-6 shadow-lg sm:max-w-lg sm:rounded-lg",
          className,
        )}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <Icon.Close className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...rest}
    />
  )
}

export const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
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

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...rest}
    />
  )
})

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-muted-foreground text-sm", className)}
      {...rest}
    />
  )
})
