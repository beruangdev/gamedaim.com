"use client"

import * as React from "react"

import {
  AlertDialog as InternalAlertDialog,
  AlertDialogProps,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog"

interface AlertDialog
  extends React.ForwardRefExoticComponent<
    AlertDialogProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof AlertDialogTrigger
  Content: typeof AlertDialogContent
  Header: typeof AlertDialogHeader
  Footer: typeof AlertDialogFooter
  Title: typeof AlertDialogTitle
  Description: typeof AlertDialogDescription
  Action: typeof AlertDialogAction
  Cancel: typeof AlertDialogCancel
}

const AlertDialog = InternalAlertDialog as AlertDialog

AlertDialog.Trigger = AlertDialogTrigger
AlertDialog.Content = AlertDialogContent
AlertDialog.Header = AlertDialogHeader
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Title = AlertDialogTitle
AlertDialog.Description = AlertDialogDescription
AlertDialog.Action = AlertDialogAction
AlertDialog.Cancel = AlertDialogCancel

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

export type { AlertDialogProps }
