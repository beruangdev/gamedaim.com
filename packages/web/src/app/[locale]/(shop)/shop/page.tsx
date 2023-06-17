import React from "react"
import ShopPageContent from "./content"
import { getBrandsPrePaid } from "@/lib/api/server/top-up"

export default async function ShopPage() {
  const { prePaidBrands } = await getBrandsPrePaid()
  return <ShopPageContent prePaidBrands={prePaidBrands} />
}
