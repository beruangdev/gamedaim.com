import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditTopicForm } from "./form"
import { getTopicByIdAction } from "@/lib/api/server/topic"

export const metadata: Metadata = {
  title: "Edit Topic Dashboard",
  description: "Edit Topic Dashboard",
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

interface EditTopicDashboardProps {
  params: { id: string }
}

export default async function EditTopicDashboard(
  props: EditTopicDashboardProps,
) {
  const { params } = props
  const { data } = await getTopicByIdAction(params.id as string)

  if (!data) {
    notFound()
  }

  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <EditTopicForm id={data.id} />
      </div>
    </div>
  )
}
