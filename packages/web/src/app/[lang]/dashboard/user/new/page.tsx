import * as React from "react"

import { AddNewUserForm } from "./form"

export default function CreateUserDashboard() {
  return (
    <>
      <>
        <div className="mb-[100px] mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <AddNewUserForm />
          </div>
        </div>
      </>
    </>
  )
}
