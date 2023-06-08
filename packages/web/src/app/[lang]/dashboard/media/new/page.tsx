import * as React from "react"
import { Metadata } from "next"
import { UploadMediaDashboard } from "./form"

export const metadata: Metadata = {
  title: "Upload Media Dashboard",
  description: "Upload Media Dashboard",
}

export default function UploadMediasDashboardPage() {
  return (
    <>
      <UploadMediaDashboard />
    </>
  )
}
