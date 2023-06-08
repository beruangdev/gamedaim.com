import * as React from "react"
import { Metadata } from "next"

import { SettingForm } from "./form"

export const metadata: Metadata = {
  title: "Setting Dashboard",
  description: "Setting Dashboard",
}

export default function DashboardPage() {
  return <SettingForm />
}
