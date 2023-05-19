"use client"

import * as React from "react"

import {
  Dialog as InternalDialog,
  DialogProps,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog"

interface Dialog
  extends React.ForwardRefExoticComponent<
    DialogProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof DialogTrigger
  Content: typeof DialogContent
  Header: typeof DialogHeader
  Footer: typeof DialogFooter
  Title: typeof DialogTitle
  Description: typeof DialogDescription
}

const Dialog = InternalDialog as Dialog

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Footer = DialogFooter
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
