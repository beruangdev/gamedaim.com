"use client"

import * as React from "react"
import NextLink from "next/link"

import { Sidebar } from "@/components/Navigation"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

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
        className={`${open ? "max-lg:translate-x-0" : ""
          } z-[99] h-full w-3/12 max-w-[250px] transition-[transform] max-lg:fixed max-lg:w-[250px] max-lg:-translate-x-full`}
      >
        <Sidebar.Dashboard />
      </div>
      <div className="w-full px-3 transition-all max-lg:w-full">{children}</div>
      <div
        className="bg-background fixed inset-x-0 bottom-0 z-[9999] flex items-center justify-around border-t py-3 lg:hidden"
        ref={ref}
      >
        <NextLink
          className="text-foreground flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around text-center"
          href="/dashboard"
        >
          <Button
            variant="ghost"
            className="h-12 flex-col items-center justify-around rounded"
          >
            <Icon.Dashboard />
            Dashboard
          </Button>
        </NextLink>
        <NextLink
          className="text-foreground flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around text-center"
          href="/dashboard/articles"
        >
          <Button
            variant="ghost"
            className="h-12 flex-col items-center justify-around rounded"
          >
            <Icon.Article />
            Articles
          </Button>
        </NextLink>
        <Button
          variant="ghost"
          onClick={() => setOpen((prev) => !prev)}
          className="text-froeground flex h-12 basis-1/3 cursor-pointer flex-col items-center justify-around rounded text-center"
        >
          <Icon.MoreVert />
          More
        </Button>
      </div>
    </div>
  )
})
