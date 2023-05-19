"use client"

import * as React from "react"

import {
  Command as InternalCommand,
  CommandProps,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command"

interface Command
  extends React.ForwardRefExoticComponent<
    CommandProps & React.RefAttributes<HTMLDivElement>
  > {
  Dialog: typeof CommandDialog
  Input: typeof CommandInput
  List: typeof CommandList
  Empty: typeof CommandEmpty
  Group: typeof CommandGroup
  Item: typeof CommandItem
  Shortcut: typeof CommandShortcut
  Separator: typeof CommandSeparator
}

const Command = InternalCommand as Command

Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Shortcut = CommandShortcut
Command.Separator = CommandSeparator

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
