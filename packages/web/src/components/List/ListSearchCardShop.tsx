import * as React from "react"
import NextLink from "next/link"

import { ThumbnailTopUp } from "@/components/Image"
import { slugify } from "@/utils/helper"
import { PriceListPostPaidProps, PriceListPrePaidProps } from "@/lib/data-types"
interface SearchCardProps {
  resultList: (PriceListPrePaidProps | PriceListPostPaidProps)[]
}
export const ListSearchCardShop = (props: SearchCardProps) => {
  const { resultList } = props
  return (
    <div className="flex flex-col">
      {resultList.length > 0 ? (
        resultList.map((list, index) => {
          return (
            <NextLink
              aria-label={list.brand}
              href={`/shop/topup/${slugify(list.brand)}`}
              key={index}
              className="mb-2 w-full"
            >
              <div className="hover:bg-primary hover:text-background flex flex-row">
                <ThumbnailTopUp
                  url={slugify(list.brand)}
                  className="relative mr-2 h-[50px] w-[50px] overflow-hidden rounded-lg"
                />
                <div className="">
                  <h3 className="mb-2 text-lg font-medium">{list.brand}</h3>
                </div>
              </div>
            </NextLink>
          )
        })
      ) : (
        <>
          <p>Product not found</p>
        </>
      )}
    </div>
  )
}
