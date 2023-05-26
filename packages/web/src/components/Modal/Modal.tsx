import * as React from "react"
import {
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/UI/Dialog"

interface ModalProps {
  content: React.ReactNode
  trigger: React.ReactNode
  title: string
}

export const Modal = (props: ModalProps) => {
  const { content, trigger, title } = props
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="Button violet">{trigger}</button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="DialogContent">
            <DialogTitle className="DialogTitle">{title}</DialogTitle>
            {content}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}
