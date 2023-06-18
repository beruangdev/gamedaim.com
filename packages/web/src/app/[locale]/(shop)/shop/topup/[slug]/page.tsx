import React from "react"
import ShopShowPageContent from "./content"
import {
  getBrandsPrePaid,
  getProductBySlug,
  getTopUpByBrand,
} from "@/lib/api/server/top-up"
import {
  getSettingByKeyAction,
  getSettingsSiteAction,
} from "@/lib/api/server/setting"
import { getMargin, getPaymentChannel } from "@/lib/api/server/payment"

interface ShopShowPageProps {
  slug: string
}
export default async function ShopShowPage({
  params,
}: {
  params: ShopShowPageProps
}) {
  const { slug } = params
  const { prePaidBrands } = await getBrandsPrePaid()
  const { data: siteEmailShop } = await getSettingByKeyAction("siteEmailShop")
  const settingsSite = {
    ...(await getSettingsSiteAction()),
    siteEmailShop,
  }
  const { topUp } = await getTopUpByBrand(slug as string)
  const { products } = await getProductBySlug(topUp?.brand as string)
  const { channel } = await getPaymentChannel()
  const { margin } = await getMargin()

  return (
    <ShopShowPageContent
      slug={slug}
      prePaidBrands={prePaidBrands}
      settingsSite={settingsSite}
      topUp={topUp}
      products={products || []}
      channel={channel}
      margin={margin}
    />
  )
}
