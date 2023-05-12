"use client"

import * as React from "react"
import NextLink from "next/link"
import { Button } from "ui"
import {
  HiOutlineDocument,
  HiOutlineBars3BottomLeft,
  HiOutlineSquares2X2,
} from "react-icons/hi2"

import { Sidebar } from "."

interface DashboardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const DashboardContainer = React.forwardRef<
  HTMLDivElement,
  DashboardContainerProps
>((props, ref) => {
  const { children, ...rest } = props

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <div className="relative flex h-auto" {...rest} ref={ref}>
      <div
        className={`${
          open ? "max-lg:translate-x-0" : ""
        } z-[99] h-full w-3/12 max-w-[250px] transition-[transform] max-lg:fixed max-lg:w-[250px] max-lg:-translate-x-full`}
      >
        <Sidebar.Dashboard />
      </div>
      <div className="w-full px-3 transition-all max-lg:w-full">{children}</div>
      <div
        className="dark:bg-theme-800 fixed inset-x-0 bottom-0 z-[9999] flex items-center justify-around border-t bg-white py-3 lg:hidden"
        ref={ref}
      >
        <NextLink
          className="text-theme-800 flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around text-center"
          href="/dashboard"
        >
          <Button
            variant="ghost"
            className="h-12 flex-col items-center justify-around rounded"
          >
            <HiOutlineSquares2X2 />
            Dashboard
          </Button>
        </NextLink>
        <NextLink
          className="text-theme-800 flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around text-center"
          href="/dashboard/articles"
        >
          <Button
            variant="ghost"
            className="h-12 flex-col items-center justify-around rounded"
          >
            <HiOutlineDocument />
            Articles
          </Button>
        </NextLink>
        <Button
          variant="ghost"
          onClick={() => setOpen((prev) => !prev)}
          className="text-theme-800 flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around rounded text-center"
        >
          <HiOutlineBars3BottomLeft />
          More
        </Button>
      </div>
    </div>
  )
})
