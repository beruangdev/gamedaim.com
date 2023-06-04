import * as React from "react"
import { Metadata } from "next"

import { TopicDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Topic Dashboard",
  description: "Topic Dashboard",
}

export default function DashboardPage() {
  return (
    <div>
      <TopicDashboardContent />
    </div>
  )
}
