import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import { getProductBySlug, getTopUpByBrand } from "@/lib/api/server/top-up"
import { TopUpProductContent } from "./content"
import { getSettingsSiteAction } from "@/lib/api/server/setting"
import { getMargin, getPaymentChannel } from "@/lib/api/server/payment"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { slug, locale } = params

  const { topUp } = await getTopUpByBrand(slug as string)

  return {
    title: `Top Up ${topUp?.brand}`,
    description: `Gamedaim Top Up ${topUp?.brand}`,
    openGraph: {
      title: `Top Up ${topUp?.brand}`,
      description: `Gamedaim Top Up ${topUp?.brand}`,
      url:
        locale === "id"
          ? `${env.SiTE_URL}/shop/top-up/${slug}`
          : `${env.EN_SiTE_URL}/shop/top-up${slug}`,
      locale: locale,
    },
  }
}

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
