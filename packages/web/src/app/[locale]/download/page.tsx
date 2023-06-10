import * as React from "react"

import {
  getDownloadByTypeAndLangAction,
  getDownloadsByLangAction,
} from "@/lib/api/server/download"
import { getTopicsByLangAction } from "@/lib/api/server/topic"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadPageContent } from "./content"

export default async function ShopDashboardPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: apps } = await getDownloadByTypeAndLangAction("app", locale)
  const { data: topics } = await getTopicsByLangAction(locale, 1)
  const { data: games } = await getDownloadByTypeAndLangAction("game", locale)

  return (
    <DownloadPageContent
      downloads={downloads}
      apps={apps}
      games={games}
      topics={topics}
    />
  )
}
