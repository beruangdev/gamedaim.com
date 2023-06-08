import * as React from "react"
import { Metadata } from "next"

import { AddNewUserForm } from "./form"

export const metadata: Metadata = {
  title: "Add New User Dashboard",
  description: "Add New User Dashboard",
}

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
