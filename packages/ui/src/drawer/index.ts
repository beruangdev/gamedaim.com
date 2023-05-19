"use client"

import * as React from "react"

import {
  Drawer as InternalDrawer,
  DrawerProps,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer"

interface Drawer
  extends React.ForwardRefExoticComponent<
    DrawerProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof DrawerTrigger
  Content: typeof DrawerContent
  Header: typeof DrawerHeader
  Footer: typeof DrawerFooter
  Title: typeof DrawerTitle
  Description: typeof DrawerDescription
}

const Drawer = InternalDrawer as Drawer

Drawer.Trigger = DrawerTrigger
Drawer.Content = DrawerContent
Drawer.Header = DrawerHeader
Drawer.Footer = DrawerFooter
Drawer.Title = DrawerTitle
Drawer.Description = DrawerDescription

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
