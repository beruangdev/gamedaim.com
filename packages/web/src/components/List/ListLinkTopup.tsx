"use client"

import * as React from "react"
import { Button } from "@/components/UI/Button"
import { PriceListPrePaidProps } from "@/lib/data-types"

interface ListLinkTopUpProps {
  ListLink: PriceListPrePaidProps[]
  active: string
  chooseTab: (value: string) => void
}

export const ListLinkTopup = React.forwardRef<
  HTMLDivElement,
  ListLinkTopUpProps
>((props, ref) => {
  const { ListLink, chooseTab, active } = props
  return (
    <div ref={ref} className="flex flex-wrap gap-2 overflow-auto">
      {ListLink.map((link, i: number) => {
        return (
          <Button
            key={i}
            aria-label={`Show ${link.category}`}
            variant={active === link.category ? "info" : "outline"}
            className="border-border bg-shop h-[unset] rounded-lg focus:ring-0"
            onClick={() => {
              chooseTab(link.category)
            }}
          >
            {link.category}
          </Button>
        )
      })}
    </div>
  )
})
