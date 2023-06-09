import * as React from "react"
import { Metadata } from "next"

import { DownloadDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Download Dashboard",
  description: "Download Dashboard",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function DownloadDashboard() {
  return <DownloadDashboardContent />
}
