import { BannerShop } from "@/components/Banner"
import { ListCardShop, ListLinkTopup } from "@/components/List"
import { BannerProps, PriceListPrePaidProps } from "@/lib/data-types"
import { fetcher } from "@/lib/http"
import { addPropertiesPrices, groupTopUpByCategory } from "@/utils/helper"
import React from "react"

interface ShopTopUpContentProps {
  prePaidBrands: PriceListPrePaidProps[]
}

export default async function ShopTopUpContent({
  prePaidBrands,
}: ShopTopUpContentProps) {
  const filteredPrices = prePaidBrands.map(addPropertiesPrices)

  const getPricesByCategory = Array.from(
    new Set(prePaidBrands.map((item) => item.category)),
  ).map((category) => {
    return prePaidBrands.filter((item) => item.category === category)[0]
  })

  const showTopUpByCategory = groupTopUpByCategory(filteredPrices)

  const [listBanner, setListBanner] = React.useState<BannerProps[]>([])
  const activeBanner = listBanner.filter((list) => list.active === true)
  const [activeTab, setActiveTab] = React.useState<string>("Games")

  function activatePcTab(category: string) {
    setActiveTab(category)
  }

  React.useEffect(() => {
    Promise.all([
      fetcher("/setting/banner1"),
      fetcher("/setting/banner2"),
      fetcher("/setting/banner3"),
      fetcher("/setting/banner4"),
    ])
      .then(([response1, response2, response3, response4]) => {
        const data1 = response1.data
        const data2 = response2.data
        const data3 = response3.data
        const data4 = response4.data
        const newBannerList = [
          {
            index: 1,
            url: (data1 && data1.value) || "",
            active: (data1 && true) || false,
          },
          {
            index: 2,
            url: (data2 && data2.value) || "",
            active: (data2 && true) || false,
          },
          {
            index: 3,
            url: (data3 && data3.value) || "",
            active: (data3 && true) || false,
          },
          {
            index: 4,
            url: (data4 && data4.value) || "",
            active: (data4 && true) || false,
          },
        ]
        setListBanner(newBannerList)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="mx-auto my-5 flex w-full flex-col space-y-5 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      {activeBanner && (
        <div>
          <BannerShop content={activeBanner} />
        </div>
      )}
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
