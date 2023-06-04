import * as React from "react"
import { Metadata } from "next"

import { ArticleDashboardContent } from "./content"
import { LanguageTypeData } from "@/lib/data-types"

export const metadata: Metadata = {
  title: "Article Dashboard",
  description: "Article Dashboard",
}

export default function ArticlesDashboard({
  params,
}: {
  params: { lang: LanguageTypeData }
}) {
  const { lang } = params

  return (
    <>
      <ArticleDashboardContent lang={lang} />
    </>
  )
}
