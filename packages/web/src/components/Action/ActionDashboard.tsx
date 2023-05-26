"use client"

import * as React from "react"
import NextLink from "next/link"
import { UrlObject } from "url"

import { AlertDelete } from "./AlertDelete"
import { Icon } from "@/components/UI/Icon"
import { cn } from "@/utils/classname"

export interface ActionDashboardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDelete?: () => void
  onEdit?: () => void
  onView?: () => void
  deleteLink?: string | UrlObject
  editLink?: string | UrlObject
  viewLink?: string | UrlObject
  className?: string
  content?: string
}

export const ActionDashboard = React.forwardRef<
  HTMLDivElement,
  ActionDashboardProps
>((props, ref) => {
  const {
    onDelete,
    onEdit,
    onView,
    deleteLink,
    editLink,
    viewLink,
    className,
    content,
    ...rest
  } = props

  const [openModal, setOpenModal] = React.useState<boolean>(false)

  return (
    <div
      ref={ref}
      className={cn(
        "flex content-center items-center justify-center",
        className,
      )}
      {...rest}
    >
      {viewLink && (
        <NextLink href={viewLink} target="_blank">
          <Icon.Visibility className="hover:text-primary/90 mr-2 w-4  transform cursor-pointer hover:scale-110" />
        </NextLink>
      )}

      {onView && (
        <Icon.Visibility
          className="hover:text-primary/90 mr-2 w-4  transform cursor-pointer hover:scale-110"
          onClick={onView}
        />
      )}

      {editLink && (
        <NextLink href={editLink}>
          <Icon.Edit className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110" />
        </NextLink>
      )}

      {onEdit && (
        <Icon.Edit
          className="hover:text-primary/90 mr-2 w-4  transform cursor-pointer hover:scale-110"
          onClick={onEdit}
        />
      )}

      {deleteLink && (
        <NextLink href={deleteLink}>
          <Icon.Delete className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110" />
        </NextLink>
      )}

      {onDelete && (
        <>
          <Icon.Delete
            className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
            onClick={() => setOpenModal(true)}
          />
          <AlertDelete
            desc={<>{content}</>}
            isOpen={openModal}
            className="max-w-[366px]"
            onDelete={onDelete}
            onClose={() => setOpenModal(false)}
          />
        </>
      )}
    </div>
  )
})
