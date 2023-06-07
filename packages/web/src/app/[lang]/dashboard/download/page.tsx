import * as React from "react"
import { Metadata } from "next"

import { DownloadDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Download Dashboard",
  description: "Download Dashboard",
}

export default function DownloadDashboard() {
  return <DownloadDashboardContent />
}
