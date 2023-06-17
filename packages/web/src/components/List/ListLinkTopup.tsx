import * as React from "react"
import { PriceListPrePaidProps } from "@/lib/data-types"
import { Button } from "@/components/UI/Button"

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
            variant={active === link.category ? "default" : "outline"}
            className="dark:border-theme-600 border-theme-300 h-[unset] rounded-lg focus:ring-0"
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
