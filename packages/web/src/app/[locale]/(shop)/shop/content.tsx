"use client"

import * as React from "react"
import { ListCardShop, ListLinkTopup } from "@/components/List"
import { PriceListPrePaidProps } from "@/lib/data-types"
import { addPropertiesPrices, groupTopUpByCategory } from "@/utils/helper"

interface TopUpProps {
  prePaidBrands: PriceListPrePaidProps[]
}

export function ShopContent(props: TopUpProps) {
  const { prePaidBrands } = props

  const filteredPrices = prePaidBrands.map(addPropertiesPrices)

  const getPricesByCategory = Array.from(
    new Set(prePaidBrands.map((item) => item.category)),
  ).map((category) => {
    return prePaidBrands.filter((item) => item.category === category)[0]
  })

  const showTopUpByCategory = groupTopUpByCategory(filteredPrices)

  const [activeTab, setActiveTab] = React.useState<string>("Games")

  function activatePcTab(category: string) {
    setActiveTab(category)
  }

  return (
    <div className="mx-auto my-5 flex w-full flex-col space-y-5 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="my-2 flex flex-col lg:flex-row">
        <div className="order-2 w-full lg:order-1 lg:w-[50%]">
          <ListLinkTopup
            active={activeTab}
            ListLink={getPricesByCategory}
            chooseTab={activatePcTab}
          />
        </div>
      </div>
      {showTopUpByCategory.map((list) => {
        if (list.category === activeTab) {
          return (
            <React.Fragment key={list.category}>
              <ListCardShop listTopUp={list.brands} />
            </React.Fragment>
          )
        }
      })}
    </div>
  )
}
