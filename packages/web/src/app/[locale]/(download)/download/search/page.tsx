import * as React from "react"

import { getDownloadsByLangAction } from "@/lib/api/server/download"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadSearchContent } from "./content"

export const revalidate = 60

export default async function DownloadByTopicPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)

  return <DownloadSearchContent downloads={downloads} locale={locale} />
}
