import * as React from "react"
import NextLink, { LinkProps } from "next/link"

export interface SidebarToggleItemProps extends LinkProps {
  children?: React.ReactNode
}

export const SidebarToggleItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarToggleItemProps
>((props, ref) => {
  const { children, href } = props

  return (
    <NextLink
      href={href}
      className="text-foreground bg-background hover:bg-primary/10 group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal transition duration-75"
      ref={ref}
    >
      {children}
    </NextLink>
  )
})
