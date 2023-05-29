import * as React from "react"

import { FormNewUser } from "./form"

export default function CreateUsersDashboard() {
  return (
    <>
      <>
        <div className="mb-[100px] mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <FormNewUser />
          </div>
        </div>
      </>
    </>
  )
}
