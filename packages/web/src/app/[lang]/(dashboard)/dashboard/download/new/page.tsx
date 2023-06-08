import * as React from "react"
import { LanguageTypeData } from "@/lib/data-types"

import { AddDownloadForms } from "./form"

interface CreateArticleDashboardProps {
  params: { lang: LanguageTypeData }
}

export default function CreateArticleDashboard({
  params,
}: CreateArticleDashboardProps) {
  const { lang } = params

  return <AddDownloadForms lang={lang} />
}
