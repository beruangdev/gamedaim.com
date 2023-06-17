import React from "react"
import ShopTopUpContent from "./content"
import { getBrandsPrePaid } from "@/lib/api/server/top-up"

export default async function ShopTopUpPage() {
  const { prePaidBrands } = await getBrandsPrePaid()
  return <ShopTopUpContent prePaidBrands={prePaidBrands} />
}
