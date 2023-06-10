"use client"

import * as React from "react"
import NextLink from "next/link"

import { Icon } from "@/components/UI/Icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu"

import { TopicDataProps } from "@/lib/data-types"
interface DropdownLinkProps {
  title: string
  list: TopicDataProps[] | null
}

export const DropdownLink = (props: DropdownLinkProps) => {
  const { list, title } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:shadow-outline bg-muted/500 text-foreground rounded px-4 py-2 font-bold focus:outline-none">
        <span className="mr-2">{title}</span>
        <Icon.KeyboardArrowDown aria-label="Show List" className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {list &&
          list.map(
            (
              list: {
                title: string
                slug: string
              },
              index: React.Key | null | undefined,
            ) => (
              <DropdownMenuItem key={index}>
                <NextLink
                  aria-label={list.title}
                  href={`/download/topic/${list.slug}`}
                  className="text-muted/80 hover:bg-muted hover:text-muted/90 block px-4 py-2"
                >
                  {list.title}
                </NextLink>
              </DropdownMenuItem>
            ),
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
