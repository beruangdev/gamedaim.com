import * as React from "react"
import { notFound } from "next/navigation"

import { EditTopicForm } from "./form"
import { getTopicByIdAction } from "@/lib/api/server/topic"

export default async function EditUserDashboard({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { data } = await getTopicByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return (
    <>
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <EditTopicForm id={data.id} />
        </div>
      </div>
    </>
  )
}
