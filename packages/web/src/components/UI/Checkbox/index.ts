"use client"

import * as React from "react"

import { Checkbox as InternalCheckbox, CheckboxProps } from "./Checkbox"
import { CheckboxGroup, CheckboxGroupProps } from "./CheckboxGroup"

interface Checkbox
  extends React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLInputElement>
  > {
  Group: typeof CheckboxGroup
}

const Checkbox = InternalCheckbox as Checkbox

Checkbox.Group = CheckboxGroup

export { Checkbox, CheckboxGroup }
export type { CheckboxProps, CheckboxGroupProps }
