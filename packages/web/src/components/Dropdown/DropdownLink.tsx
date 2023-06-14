"use client"

import * as React from "react"
import NextLink from "next/link"

import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
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
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="bg-muted/50 text-foreground rounded px-4 py-2 font-bold"
        >
          <span className="mr-2">{title}</span>
          <Icon.KeyboardArrowDown aria-label="Show List" className="h-6 w-6" />
        </Button>
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
                  className="hover:bg-muted/10 block px-4 py-2"
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
