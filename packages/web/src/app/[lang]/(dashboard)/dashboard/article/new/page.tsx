import * as React from "react"

import { AddArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"

interface CreateArticlesDashboardProps {
  params: {
    lang: LanguageTypeData
  }
}

export default function CreateArticlesDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { lang } = params
  return (
    <>
      <AddArticleForm lang={lang} />
    </>
  )
}
