import * as React from "react"
import { notFound } from "next/navigation"

import { EditDownloadForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getDownloadByIdAction } from "@/lib/api/server/download"

interface CreateArticlesDashboardProps {
  params: { locale: LanguageTypeData; id: string }
}
export default async function CreateDownloadsDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { locale, id } = params
  const { data } = await getDownloadByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return <EditDownloadForm locale={locale} downloadId={id} />
}
