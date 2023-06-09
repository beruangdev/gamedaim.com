import * as React from "react"
import { Metadata } from "next"

import { AddNewUserForm } from "./form"

export const metadata: Metadata = {
  title: "Add New User Dashboard",
  description: "Add New User Dashboard",
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

export default function CreateUserDashboard() {
  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <AddNewUserForm />
      </div>
    </div>
  )
}
