"use client"

import * as React from "react"

import {
  NavigationMenu as InternalNavigationMenu,
  NavigationMenuProps,
  navigationMenuTriggerStyle,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./navigation-menu"

interface NavigationMenu
  extends React.ForwardRefExoticComponent<
    NavigationMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof NavigationMenuList
  Item: typeof NavigationMenuItem
  Content: typeof NavigationMenuContent
  Trigger: typeof NavigationMenuTrigger
  Link: typeof NavigationMenuLink
  Indicator: typeof NavigationMenuIndicator
  Viewport: typeof NavigationMenuViewport
}

const NavigationMenu = InternalNavigationMenu as NavigationMenu

NavigationMenu.List = NavigationMenuList
NavigationMenu.Item = NavigationMenuItem
NavigationMenu.List = NavigationMenuList
NavigationMenu.Item = NavigationMenuItem
NavigationMenu.Content = NavigationMenuContent
NavigationMenu.Trigger = NavigationMenuTrigger
NavigationMenu.Link = NavigationMenuLink
NavigationMenu.Indicator = NavigationMenuIndicator
NavigationMenu.Viewport = NavigationMenuViewport

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
