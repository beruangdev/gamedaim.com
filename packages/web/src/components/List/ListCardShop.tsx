import * as React from "react"
import { ShopCard } from "@/components/Card"
import { PriceListPrePaidProps } from "@/lib/data-types"

interface ListCardShopProps {
  listTopUp: PriceListPrePaidProps[]
}
export const ListCardShop = React.forwardRef<HTMLDivElement, ListCardShopProps>(
  (props, ref) => {
    const { listTopUp } = props

    return (
      <>
        <div ref={ref} className="flex flex-wrap">
          {listTopUp.map((list: PriceListPrePaidProps, i: number) => {
            return (
              <ShopCard
                key={i}
                url={`/shop/topup/${list.slug}`}
                title={list.brand}
                brand={list.brand}
              />
            )
          })}
        </div>
      </>
    )
  },
)
