import * as React from "react"
import NextLink from "next/link"
import { UrlObject } from "url"
import {
  MdOutlineVisibility,
  MdOutlineModeEdit,
  MdOutlineDelete,
} from "react-icons/md"
import { cn } from "@dafunda-ui-test/react"

import { AlertDelete } from "@/components/Alert"

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
        "flex content-center items-center justify-center text-center",
        className,
      )}
      {...rest}
    >
      {viewLink && (
        <NextLink aria-label="View" href={viewLink} target="_blank">
          <MdOutlineVisibility
            aria-label="View"
            className="hover:text-primar/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
          />
        </NextLink>
      )}

      {onView && (
        <MdOutlineVisibility
          aria-label="View"
          className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
          onClick={onView}
        />
      )}

      {editLink && (
        <NextLink aria-label="Edit" href={editLink}>
          <MdOutlineModeEdit
            aria-label="Edit"
            className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
          />
        </NextLink>
      )}

      {onEdit && (
        <MdOutlineModeEdit
          aria-label="Edit"
          className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
          onClick={onEdit}
        />
      )}

      {deleteLink && (
        <NextLink aria-label="Delete" href={deleteLink}>
          <MdOutlineDelete
            aria-label="Delete"
            className="hover:text-primary/90 mr-2 w-4 transform cursor-pointer hover:scale-110"
          />
        </NextLink>
      )}

      {onDelete && (
        <>
          <MdOutlineDelete
            aria-label="Delete"
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
