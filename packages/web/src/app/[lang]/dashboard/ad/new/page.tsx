import * as React from "react"
import { Metadata } from "next"

import { AddNewAdForm } from "./form"

export const metadata: Metadata = {
  title: "Add New Ad Dashboard",
  description: "Add New Ad Dashboard",
}

export default function CreateAdDashbaord() {
  return (
    <>
      <>
        <div className="mb-[100px] mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <AddNewAdForm />
          </div>
        </div>
      </>
    </>
  )
}
