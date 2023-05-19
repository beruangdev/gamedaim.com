"use client"

import * as React from "react"

import {
  Collapsible as InternalCollapsible,
  CollapsibleProps,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible"

interface Collapsible
  extends React.ForwardRefExoticComponent<
    CollapsibleProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof CollapsibleTrigger
  Content: typeof CollapsibleContent
}

const Collapsible = InternalCollapsible as Collapsible

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
export type { CollapsibleProps }
