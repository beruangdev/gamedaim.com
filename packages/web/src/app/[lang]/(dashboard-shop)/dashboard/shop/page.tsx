import * as React from "react"
import { Metadata } from "next"

import { ShopDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Shop Dashboard",
  description: "Shop Dashboard",
}

export default function ShopDashboardPage() {
  return <ShopDashboardContent />
}
