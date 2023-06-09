"use client"
import * as React from "react"
import NextLink from "next/link"

import { TopicDataProps } from "@/lib/data-types"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

interface DropdownLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  list: TopicDataProps[] | null
}

export const DropdownLink = React.forwardRef<HTMLDivElement, DropdownLinkProps>(
  (props, ref) => {
    const { list, title, ...rest } = props

    const [isOpen, setIsOpen] = React.useState(false)

    function toggleDropdown() {
      setIsOpen(!isOpen)
    }

    return (
      <>
        <div className="relative" ref={ref} {...rest}>
          <Button
            aria-label="Show List"
            className="focus:shadow-outline dark:bg-theme-700 dark:text-theme-200 bg-theme-300 text-theme-800 rounded px-4 py-2 font-bold focus:outline-none"
            onClick={toggleDropdown}
          >
            <span className="mr-2">{title}</span>
            <Icon.KeyboardArrowDown
              aria-label="Show List"
              className="h-6 w-6"
            />
          </Button>
          {isOpen && (
            <div className="absolute z-[15] mt-1 rounded bg-white shadow-lg">
              {list &&
                list.map(
                  (
                    list: {
                      title: string
                      slug: string
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <NextLink
                      aria-label={list.title}
                      key={index}
                      href={`/download/topic/${list.slug}`}
                      className="text-theme-800 hover:bg-theme-100 hover:text-theme-900 block px-4 py-2"
                    >
                      {list.title}
                    </NextLink>
                  ),
                )}
            </div>
          )}
        </div>
      </>
    )
  },
)
