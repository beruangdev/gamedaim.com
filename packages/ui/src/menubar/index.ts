"use client"

import * as React from "react"

import {
  Menubar as InternalMenubar,
  MenubarProps,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
} from "./menubar"

interface Menubar
  extends React.ForwardRefExoticComponent<
    MenubarProps & React.RefAttributes<HTMLDivElement>
  > {
  Menu: typeof MenubarMenu
  Trigger: typeof MenubarTrigger
  Content: typeof MenubarContent
  Item: typeof MenubarItem
  CheckboxItem: typeof MenubarCheckboxItem
  RadioItem: typeof MenubarRadioItem
  Label: typeof MenubarLabel
  Separator: typeof MenubarSeparator
  Shortcut: typeof MenubarShortcut
  Group: typeof MenubarGroup
  Portal: typeof MenubarPortal
  Sub: typeof MenubarSub
  SubContent: typeof MenubarSubContent
  SubTrigger: typeof MenubarSubTrigger
  RadioGroup: typeof MenubarRadioGroup
}

const Menubar = InternalMenubar as Menubar

Menubar.Trigger = MenubarTrigger
Menubar.Content = MenubarContent
Menubar.Item = MenubarItem
Menubar.CheckboxItem = MenubarCheckboxItem
Menubar.RadioItem = MenubarRadioItem
Menubar.Label = MenubarLabel
Menubar.Separator = MenubarSeparator
Menubar.Shortcut = MenubarShortcut
Menubar.Group = MenubarGroup
Menubar.Portal = MenubarPortal
Menubar.Sub = MenubarSub
Menubar.SubContent = MenubarSubContent
Menubar.SubTrigger = MenubarSubTrigger
Menubar.RadioGroup = MenubarRadioGroup

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
