import * as React from "react"
import { Metadata } from "next"

import { SettingForm } from "./form"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

export const metadata: Metadata = {
  title: "Setting Dashboard",
  description: "Setting Dashboard",
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

export const revalidate = 60
export default async function DashboardPage() {
  const { data } = await getSettingByKeyAction("settings")
  let settingsValue
  if (data) {
    const parsedData = JSON.parse(data.value)
    settingsValue = parsedData
  }
  return <SettingForm settingsValue={settingsValue} />
}
