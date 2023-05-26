"use client"
import * as React from "react"
import { MdOutlineDelete } from "react-icons/md"
import { Button } from "@/components/UI/Button"
import { AlertDelete } from "@/components/Action"

interface DeleteMediaButtonProps {
  content: React.ReactNode
  deleteMedia: () => void
}

export const DeleteMediaButton = React.forwardRef<
  HTMLDivElement,
  DeleteMediaButtonProps
>((props, ref) => {
  const { content, deleteMedia } = props

  const [openModal, setOpenModal] = React.useState<boolean>(false)
  return (
    <div ref={ref}>
      <Button
        aria-label="Delete Media"
        className="absolute z-20 rounded-full p-0"
        onClick={() => setOpenModal(true)}
      >
        <MdOutlineDelete aria-label="Delete Media" />
      </Button>
      <AlertDelete
        desc={<>{content}</>}
        isOpen={openModal}
        className="max-w-[366px]"
        onDelete={deleteMedia}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
})
