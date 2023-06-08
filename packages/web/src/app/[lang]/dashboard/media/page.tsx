import * as React from "react"
import { Metadata } from "next"
import { MediaLibraryDashboard } from "./content"

export const metadata: Metadata = {
  title: "Media Dashboard",
  description: "Media Dashboard",
}

export default function MediasDashboard() {
  return (
    <>
      <MediaLibraryDashboard />
    </>
  )
}
