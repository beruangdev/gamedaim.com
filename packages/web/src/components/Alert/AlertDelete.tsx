import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@dafunda-ui-test/react"

interface AlertDeleteProps {
  desc?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
  onDelete: () => void
}

export const AlertDelete: React.FunctionComponent<AlertDeleteProps> = (
  props,
) => {
  const { desc, isOpen, onClose, className, onDelete } = props

  function handleDeleteAndClose() {
    onDelete()
    onClose()
  }

  return (
    <div className={className}>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {desc}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to delete {desc}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteAndClose}>
              Yes
            </AlertDialogAction>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
