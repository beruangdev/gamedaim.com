import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import { TopUpContent } from "./content"
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
    title: "Top Up",
    description: "Gamedaim Top Up",
    openGraph: {
      title: "Top Up",
      description: "Gamedaim Top Up",
      url:
        locale === "id"
          ? `${env.SiTE_URL}/shop/top-up`
          : `${env.EN_SiTE_URL}/shop/top-up`,
      locale: locale,
    },
  }
}

export default async function TopUpPage() {
  const { prePaidBrands } = await getBrandsPrePaid()

  return <TopUpContent prePaidBrands={prePaidBrands} />
}
