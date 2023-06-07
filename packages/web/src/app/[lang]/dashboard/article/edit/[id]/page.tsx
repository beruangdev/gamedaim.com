import * as React from "react"
import { notFound } from "next/navigation"

import { EditArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getArticleByIdAction } from "@/lib/api/server/article"

interface EditArticlesDashboardProps {
  params: {
    lang: LanguageTypeData
    id: string
  }
}

export default async function EditArticlesDashboard({
  params,
}: EditArticlesDashboardProps) {
  const { lang, id } = params

  const { data } = await getArticleByIdAction(id as string)
  if (!data) {
    notFound()
  }

  return (
    <>
      <EditArticleForm lang={lang} articleId={id} />
    </>
  )
}
