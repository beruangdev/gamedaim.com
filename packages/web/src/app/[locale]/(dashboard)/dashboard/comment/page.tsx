import * as React from "react"
import { Metadata } from "next"

import { CommentDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Comment Dashboard",
  description: "Comment Dashboard",
}

export default function CommentsDashboard() {
  return <CommentDashboardContent />
}
