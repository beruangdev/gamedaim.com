import * as React from "react"
import { LanguageTypeData } from "@/lib/data-types"

import { AddDownloadForms } from "./form"

interface CreateArticleDashboardProps {
  params: { locale: LanguageTypeData }
}

export default function CreateArticleDashboard({
  params,
}: CreateArticleDashboardProps) {
  const { locale } = params

  return <AddDownloadForms locale={locale} />
}
