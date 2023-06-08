import * as React from "react"
import { notFound } from "next/navigation"

import { EditDownloadForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getDownloadByIdAction } from "@/lib/api/server/download"

interface CreateArticlesDashboardProps {
  params: { lang: LanguageTypeData; id: string }
}
export default async function CreateDownloadsDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { lang, id } = params
  const { data } = await getDownloadByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return <EditDownloadForm lang={lang} downloadId={id} />
}
