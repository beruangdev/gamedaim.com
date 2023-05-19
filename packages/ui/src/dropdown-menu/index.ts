"use client"

import * as React from "react"

import {
  DropdownMenu as InternalDropdownMenu,
  DropdownMenuProps,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu"

interface DropdownMenu
  extends React.ForwardRefExoticComponent<
    DropdownMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof DropdownMenuTrigger
  Content: typeof DropdownMenuContent
  Item: typeof DropdownMenuItem
  CheckboxItem: typeof DropdownMenuCheckboxItem
  RadioItem: typeof DropdownMenuRadioItem
  Label: typeof DropdownMenuLabel
  Separator: typeof DropdownMenuSeparator
  Shortcut: typeof DropdownMenuShortcut
  Group: typeof DropdownMenuGroup
  Portal: typeof DropdownMenuPortal
  Sub: typeof DropdownMenuSub
  SubContent: typeof DropdownMenuSubContent
  SubTrigger: typeof DropdownMenuSubTrigger
  RadioGroup: typeof DropdownMenuRadioGroup
}

const DropdownMenu = InternalDropdownMenu as DropdownMenu

DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem
DropdownMenu.RadioItem = DropdownMenuRadioItem
DropdownMenu.Label = DropdownMenuLabel
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Shortcut = DropdownMenuShortcut
DropdownMenu.Group = DropdownMenuGroup
DropdownMenu.Portal = DropdownMenuPortal
DropdownMenu.Sub = DropdownMenuSub
DropdownMenu.SubContent = DropdownMenuSubContent
DropdownMenu.SubTrigger = DropdownMenuSubTrigger
DropdownMenu.RadioGroup = DropdownMenuRadioGroup

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
