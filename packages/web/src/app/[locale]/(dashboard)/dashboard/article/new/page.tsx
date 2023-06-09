import * as React from "react"

import { AddArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"

interface CreateArticlesDashboardProps {
  params: {
    locale: LanguageTypeData
  }
}

export default function CreateArticlesDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { locale } = params
  return (
    <>
      <AddArticleForm locale={locale} />
    </>
  )
}
