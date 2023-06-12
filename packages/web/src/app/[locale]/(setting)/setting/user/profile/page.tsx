import * as React from "react"
import { Metadata } from "next"

import { EditUserForm } from "./form"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Profile",
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

export default async function EditUserProfilePage() {
  return <EditUserForm />
}
