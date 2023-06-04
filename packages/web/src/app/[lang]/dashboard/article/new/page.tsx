import * as React from "react"

import { AddArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"

export default function CreateArticlesDashboard({
  params,
}: {
  params: { lang: LanguageTypeData }
}) {
  const { lang } = params
  return (
    <>
      <AddArticleForm lang={lang} />
    </>
  )
}
