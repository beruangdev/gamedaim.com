"use client"

import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
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
        size={null}
        className="absolute z-20 h-[20px] w-[20px] rounded-full p-0"
        onClick={() => setOpenModal(true)}
      >
        <Icon.Close aria-label="Delete Media" />
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
