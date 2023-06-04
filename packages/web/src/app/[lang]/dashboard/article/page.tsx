import * as React from "react"
import { Metadata } from "next"

import { ArticleDashboardContent } from "./content"

export const metadata: Metadata = {
  title: "Article Dashboard",
  description: "Article Dashboard",
}

export default function ArticlesDashboard() {
  return (
    <>
      <ArticleDashboardContent />
    </>
  )
}
