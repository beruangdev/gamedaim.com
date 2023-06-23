"use client"

import * as React from "react"
import NextLink from "next/link"
import { ThumbnailTopUp } from "@/components/Image"
import { slugify } from "@/utils/helper"
import { getTopUpTransactionCounter } from "@/lib/api/server/top-up"

interface ShopCardProps {
  url: string

  title: string
  brand: string
}

export const ShopCard = React.forwardRef<HTMLDivElement, ShopCardProps>(
  (props, ref) => {
    const { url, title, brand, ...rest } = props

    const [transactionCounter, setTransactionCounter] =
      React.useState<number>(0)

    React.useEffect(() => {
      const getTransactionCounter = async () => {
        const { counter } = await getTopUpTransactionCounter(brand)
        if (counter !== null) {
          setTransactionCounter(counter.transactions)
        }
      }
      getTransactionCounter()
    }, [brand])

    return (
      <div
        className="pb-3 pr-3 max-[400px]:w-1/2 min-[400px]:max-sm:w-1/3 sm:max-lg:w-1/4 lg:max-xl:w-1/5 xl:w-1/6"
        ref={ref}
        {...rest}
      >
        <NextLink
          aria-label={title}
          href={url}
          className="flex h-[250px] w-full shrink flex-col overflow-hidden rounded-md shadow-md"
        >
          <ThumbnailTopUp
            url={slugify(brand)}
            className="relative aspect-[1/1] h-[150px] w-full"
          />

          <div className="flex max-w-[200px] flex-col items-center p-2">
            <h2>{title}</h2>
            <p>{`${transactionCounter} Transaksi`}</p>
          </div>
        </NextLink>
      </div>
    )
  },
)
