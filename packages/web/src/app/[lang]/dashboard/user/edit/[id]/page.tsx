import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditUserForm } from "./form"
import { getUserByIdAction } from "@/lib/api/server/user"

export const metadata: Metadata = {
  title: "Edit User Dashboard",
  description: "Edit User Dashboard",
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
