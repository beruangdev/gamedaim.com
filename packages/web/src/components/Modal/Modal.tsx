"use client"

import * as React from "react"

import {
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/UI/Dialog"
import { cn } from "@/utils/classname"

interface ModalProps {
  content: React.ReactNode
  trigger?: React.ReactNode
  title: string
  onOpenChange: (open: boolean) => void
  open: boolean
  className?: string
}

export const Modal = (props: ModalProps) => {
  const { content, trigger, title, open, onOpenChange, className } = props
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogContent className={cn("DialogContent", className)}>
          <DialogTitle className="DialogTitle">{title}</DialogTitle>
          {content}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
