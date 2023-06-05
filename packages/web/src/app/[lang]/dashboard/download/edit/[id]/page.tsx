import * as React from "react"
import { notFound } from "next/navigation"

import { EditDownloadForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getDownloadByIdAction } from "@/lib/api/server/download"

export default async function CreateDownloadsDashboard({
  params,
}: {
  params: { lang: LanguageTypeData; id: string }
}) {
  const { lang, id } = params
  const { data } = await getDownloadByIdAction(id as string)
  if (!data) {
    notFound()
  }
  return (
    <>
      <EditDownloadForm lang={lang} downloadId={id} />
    </>
  )
}
