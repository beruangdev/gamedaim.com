import * as React from "react"
import { Metadata } from "next"

import { AdDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Ad Dashboard",
  description: "Ad Dashboard",
}

export default function DashboardPage() {
  return (
    <div>
      <AdDashboardContent />
    </div>
  )
}
