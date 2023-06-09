import * as React from "react"
import { Metadata } from "next"
import { UploadMediaDashboard } from "./form"

export const metadata: Metadata = {
  title: "Upload Media Dashboard",
  description: "Upload Media Dashboard",
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

export default function UploadMediasDashboardPage() {
  return <UploadMediaDashboard />
}
