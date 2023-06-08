import * as React from "react"
import { Metadata } from "next"

import { AddNewTopicForm } from "./form"

export const metadata: Metadata = {
  title: "Add New Topic Dashboard",
  description: "Add New Topic Dashboard",
}

export default function CreateTopicDashboard() {
  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <AddNewTopicForm />
      </div>
    </div>
  )
}
