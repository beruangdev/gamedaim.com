import * as React from "react"
import { Metadata } from "next"

import { DashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function DashboardPage() {
  return (
    <div>
      <DashboardContent />
    </div>
  )
}
