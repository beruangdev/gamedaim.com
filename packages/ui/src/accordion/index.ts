"use client"

import * as React from "react"

import {
  Accordion as InternalAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionProps,
} from "./accordion"

interface Accordion
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof AccordionItem
  Trigger: typeof AccordionTrigger
  Content: typeof AccordionContent
}

const Accordion = InternalAccordion as unknown as Accordion

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type { AccordionProps }
