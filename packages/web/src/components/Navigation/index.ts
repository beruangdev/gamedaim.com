import * as React from "react"

import { Sidebar as InternalSidebar, SidebarProps } from "./Sidebar"
import { SidebarToggle, SidebarToggleProps } from "./SidebarToggle"
import { SidebarToggleItem, SidebarToggleItemProps } from "./SidebarToggleItem"
import { SidebarItem, SidebarItemProps } from "./SidebarItem"
import { SidebarDashboard, SidebarDashboardProps } from "./SidebarDashboard"
import {
  SidebarShopDashboard,
  SidebarShopDashboardProps,
} from "./SidebarShopDashboard"

interface Sidebar
  extends React.ForwardRefExoticComponent<
    SidebarProps & React.RefAttributes<HTMLDivElement>
  > {
  Toggle: typeof SidebarToggle
  ToggleItem: typeof SidebarToggleItem
  Item: typeof SidebarItem
  Dashboard: typeof SidebarDashboard
  ShopDashboard: typeof SidebarShopDashboard
}

const Sidebar = InternalSidebar as Sidebar

Sidebar.Toggle = SidebarToggle
Sidebar.ToggleItem = SidebarToggleItem
Sidebar.Item = SidebarItem
Sidebar.Dashboard = SidebarDashboard
Sidebar.ShopDashboard = SidebarShopDashboard

export type {
  SidebarProps,
  SidebarToggleProps,
  SidebarToggleItemProps,
  SidebarItemProps,
  SidebarDashboardProps,
  SidebarShopDashboardProps,
}

export {
  Sidebar,
  SidebarToggle,
  SidebarToggleItem,
  SidebarItem,
  SidebarDashboard,
  SidebarShopDashboard,
}

export * from "./TopNav"
export * from "./SideNav"
