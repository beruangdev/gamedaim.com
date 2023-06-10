import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditUserForm } from "./form"
import { getUserByIdAction } from "@/lib/api/server/user"

export const metadata: Metadata = {
  title: "Edit User Dashboard",
  description: "Edit User Dashboard",
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

interface EditUserDashboardProps {
  params: {
    id: string
  }
}

export default async function EditUserDashboard({
  params,
}: EditUserDashboardProps) {
  const { id } = params
  const { data } = await getUserByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <EditUserForm id={data.id} />
      </div>
    </div>
  )
}
