"use client"

import * as React from "react"

import {
  Select as InternalSelect,
  SelectProps,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./select"

interface Select
  extends React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof SelectGroup
  Value: typeof SelectValue
  Trigger: typeof SelectTrigger
  Content: typeof SelectContent
  Label: typeof SelectLabel
  Item: typeof SelectItem
  Separator: typeof SelectSeparator
}

const Select = InternalSelect as Select

Select.Group = SelectGroup
Select.Value = SelectValue
Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Label = SelectLabel
Select.Item = SelectItem
Select.Separator = SelectSeparator

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
