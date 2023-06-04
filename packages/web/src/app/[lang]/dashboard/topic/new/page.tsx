import * as React from "react"

import { AddNewTopicForm } from "./form"

export default function CreateTopicDashbaord() {
  return (
    <>
      <>
        <div className="mb-[100px] mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <AddNewTopicForm />
          </div>
        </div>
      </>
    </>
  )
}
