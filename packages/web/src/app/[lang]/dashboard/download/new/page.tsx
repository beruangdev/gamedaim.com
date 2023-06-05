import * as React from "react"
import { LanguageTypeData } from "@/lib/data-types"

import { AddDownloadForms } from "./form"

export default function CreateArticlesDashboard({
  params,
}: {
  params: { lang: LanguageTypeData }
}) {
  const { lang } = params
  return (
    <>
      <AddDownloadForms lang={lang} />
    </>
  )
}
