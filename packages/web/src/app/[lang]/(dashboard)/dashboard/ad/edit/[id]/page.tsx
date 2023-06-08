import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditAdForm } from "./form"
import { getAdByIdAction } from "@/lib/api/server/ad"

export const metadata: Metadata = {
  title: "Edit Ad Dashboard",
  description: "Edit Ad Dashboard",
}

interface EditAdDashboardProps {
  params: { id: string }
}

export default async function EditAdDashboard(props: EditAdDashboardProps) {
  const { params } = props
  const { data } = await getAdByIdAction(params.id as string)

  if (!data) {
    notFound()
  }

  return (
    <>
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <EditAdForm id={data.id} />
        </div>
      </div>
    </>
  )
}
