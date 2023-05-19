"use client"

import * as React from "react"

import {
  RadioGroup as InternalRadioGroup,
  RadioGroupProps,
  RadioGroupItem,
} from "./radio-group"

interface RadioGroup
  extends React.ForwardRefExoticComponent<
    RadioGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof RadioGroupItem
}

const RadioGroup = InternalRadioGroup as RadioGroup

RadioGroup.Item = RadioGroupItem

export { RadioGroup, RadioGroupItem }
