import * as React from "react"

import { TopUpContent } from "./content"
import { getBrandsPrePaid } from "@/lib/api/server/top-up"

export const revalidate = 60

export default async function TopUpPage() {
  const { prePaidBrands } = await getBrandsPrePaid()

  return <TopUpContent prePaidBrands={prePaidBrands} />
}
