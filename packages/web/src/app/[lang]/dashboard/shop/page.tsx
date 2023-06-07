import * as React from "react"
import { Metadata } from "next"

import { ShopDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function ShopDashboardPage() {
  return <ShopDashboardContent />
}
