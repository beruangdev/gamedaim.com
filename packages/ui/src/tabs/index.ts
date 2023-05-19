"use client"

import * as React from "react"

import {
  Tabs as InternalTabs,
  TabsProps,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./tabs"

interface Tabs
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
  Content: typeof TabsContent
}

const Tabs = InternalTabs as Tabs

Tabs.List = TabsList

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsProps }
