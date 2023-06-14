import * as React from "react"

import {
  getDownloadByTypeAndLangAction,
  getDownloadsByLangAction,
  getDownloadsCountAction,
} from "@/lib/api/server/download"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicsByLangAction } from "@/lib/api/server/topic"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadAppContent } from "./content"

export const revalidate = 60

export default async function ShopDashboardPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: apps } = await getDownloadByTypeAndLangAction("app", locale)
  const { data: topics } = await getTopicsByLangAction(locale, 1)
  const { data: downloadsCount } = await getDownloadsCountAction()
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "DOWNLOAD_BELOW_HEADER",
  )

  return (
    <DownloadAppContent
      downloads={downloads}
      apps={apps}
      locale={locale}
      topics={topics}
      downloadsCount={downloadsCount}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
