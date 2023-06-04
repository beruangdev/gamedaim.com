import * as React from "react"
import { Metadata } from "next"

import { UserDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User Dashboard",
}

export default function DashboardPage() {
  return (
    <div>
      <UserDashboardContent />
    </div>
  )
}
