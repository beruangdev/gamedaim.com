import * as React from "react"
import { Metadata } from "next"

import { ShopDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Shop Dashboard",
  description: "Shop Dashboard",
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

export default function ShopDashboardPage() {
  return <ShopDashboardContent />
}
