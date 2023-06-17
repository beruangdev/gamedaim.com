import React from "react"
import ShopShowPageContent from "./content"
import { getBrandsPrePaid } from "@/lib/api/server/top-up"

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
  return <ShopShowPageContent prePaidBrands={prePaidBrands} slug={slug} />
}
