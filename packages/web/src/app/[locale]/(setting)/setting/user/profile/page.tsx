import * as React from "react"
import { Metadata } from "next"

import { EditUserForm } from "./form"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Profile",
}

export default async function EditUserProfilePage() {
  return <EditUserForm />
}
