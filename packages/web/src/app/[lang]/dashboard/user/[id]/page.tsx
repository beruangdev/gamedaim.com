import * as React from "react"
import { notFound } from "next/navigation"

import { FormLoadUser } from "./form"
import { getUserByIdAction } from "@/lib/api/server/user"

export default async function CreateUsersDashboard({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { data } = await getUserByIdAction(id as string)
  if (!data) {
    notFound()
  }
  return (
    <>
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <FormLoadUser id={data.id} />
        </div>
      </div>
    </>
  )
}
