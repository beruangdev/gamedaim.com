import * as React from "react"

import { getProductBySlug, getTopUpByBrand } from "@/lib/api/server/top-up"
import { TopUpProductContent } from "./content"
import { getSettingsSiteAction } from "@/lib/api/server/setting"
import { getMargin, getPaymentChannel } from "@/lib/api/server/payment"

export const revalidate = 60

export default async function TopUpProductSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const settingsSite = await getSettingsSiteAction()
  const { topUp } = await getTopUpByBrand(slug as string)
  const { products } = await getProductBySlug(topUp?.brand as string)
  const { channel } = await getPaymentChannel()
  const { margin } = await getMargin()

  return (
    <TopUpProductContent
      products={products}
      topUp={topUp}
      settingsSite={settingsSite}
      channel={channel}
      margin={margin}
    />
  )
}
