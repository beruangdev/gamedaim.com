"use client"

import * as React from "react"
import * as DrawerPrimitive from "@radix-ui/react-dialog"

import { cn, cva, VariantProps } from "../classname-utils"
import { Icon } from "../icon"

export type DrawerProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Root
>
export const Drawer = DrawerPrimitive.Root

export const DrawerTrigger = DrawerPrimitive.Trigger

const drawerPortalVariants = cva("fixed inset-0 z-50 flex", {
  variants: {
    position: {
      top: "items-start",
      bottom: "items-end",
      left: "justify-start",
      right: "justify-end",
    },
  },
  defaultVariants: { position: "right" },
})

interface DrawerPortalProps
  extends DrawerPrimitive.DialogPortalProps,
    VariantProps<typeof drawerPortalVariants> {}

export const DrawerPortal = ({
  position,
  className,
  children,
  ...props
}: DrawerPortalProps) => (
  <DrawerPrimitive.Portal className={cn(className)} {...props}>
    <div className={drawerPortalVariants({ position })}>{children}</div>
  </DrawerPrimitive.Portal>
)

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "bg-background/80 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100",
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </DrawerPrimitive.Overlay>
  )
})

const drawerVariants = cva(
  "fixed z-50 scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg border",
  {
    variants: {
      position: {
        top: "animate-in slide-in-from-top w-full duration-300",
        bottom: "animate-in slide-in-from-bottom w-full duration-300",
        left: "animate-in slide-in-from-left h-full duration-300",
        right: "animate-in slide-in-from-right h-full duration-300",
      },
      size: {
        content: "",
        default: "",
        sm: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        position: ["top", "bottom"],
        size: "content",
        class: "max-h-screen",
      },
      {
        position: ["top", "bottom"],
        size: "default",
        class: "h-1/3",
      },
      {
        position: ["top", "bottom"],
        size: "sm",
        class: "h-1/4",
      },
      {
        position: ["top", "bottom"],
        size: "lg",
        class: "h-1/2",
      },
      {
        position: ["top", "bottom"],
        size: "xl",
        class: "h-5/6",
      },
      {
        position: ["top", "bottom"],
        size: "full",
        class: "h-screen",
      },
      {
        position: ["right", "left"],
        size: "content",
        class: "max-w-screen",
      },
      {
        position: ["right", "left"],
        size: "default",
        class: "w-1/3",
      },
      {
        position: ["right", "left"],
        size: "sm",
        class: "w-1/4",
      },
      {
        position: ["right", "left"],
        size: "lg",
        class: "w-1/2",
      },
      {
        position: ["right", "left"],
        size: "xl",
        class: "w-5/6",
      },
      {
        position: ["right", "left"],
        size: "full",
        class: "w-screen",
      },
    ],
    defaultVariants: {
      position: "right",
      size: "default",
    },
  },
)

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DialogContentProps
>((props, ref) => {
  const { position, size, className, children, ...rest } = props

  return (
    <DrawerPortal position={position}>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ position, size }), className)}
        {...rest}
      >
        {children}
        <DrawerPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <Icon.Close className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})

export const DrawerHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
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

export const DrawerFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
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

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-foreground text-lg font-semibold", className)}
      {...rest}
    />
  )
})

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-muted-foreground text-sm", className)}
      {...rest}
    />
  )
})
