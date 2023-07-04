import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import { ShopContent } from "./content"
import { getBrandsPrePaid } from "@/lib/api/server/top-up"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Shop",
    description: "Gamedaim Shop",
    openGraph: {
      title: "Shop",
      description: "Gamedaim Shop",
      url: locale === "id" ? `${env.SiTE_URL}/shop` : `${env.EN_SiTE_URL}/shop`,
      locale: locale,
    },
  }
}

export default async function ShopPage() {
  const { prePaidBrands } = await getBrandsPrePaid()

  return <ShopContent prePaidBrands={prePaidBrands} />
}
