import * as React from "react"

import {
  Input as InternalInput,
  IInputProps,
  InputProps,
  InputOmittedType,
} from "./Input"
import { InputGroup, InputGroupProps } from "./InputGroup"
import { InputLeftAddon, InputRightAddon, InputAddonProps } from "./InputAddon"
import {
  InputLeftElement,
  InputRightElement,
  InputElementProps,
} from "./InputElement"

interface Input
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof InputGroup

  LeftAddon: typeof InputLeftAddon
  RightAddon: typeof InputRightAddon

  LeftElement: typeof InputLeftElement
  RightElement: typeof InputRightElement
}

const Input = InternalInput as Input

Input.Group = InputGroup
Input.LeftAddon = InputLeftAddon
Input.RightAddon = InputRightAddon
Input.LeftElement = InputLeftElement
Input.RightElement = InputRightElement

export { Input }
export type {
  IInputProps,
  InputProps,
  InputGroupProps,
  InputAddonProps,
  InputElementProps,
  InputOmittedType,
}

export * from "./FormControl"
export * from "./FormErrorMessage"
export * from "./FormHelperText"
export * from "./FormLabel"
