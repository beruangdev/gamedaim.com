import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import {
  getDownloadByTypeAndLangAction,
  getDownloadsByLangAction,
  getDownloadsCountAction,
} from "@/lib/api/server/download"
import { getTopicsByLangAction } from "@/lib/api/server/topic"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { DownloadGameContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Download Game",
    description: "Gamedaim Download Game",
    openGraph: {
      title: "Download Game",
      description: "Gamedaim Download Game",
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/game`
          : `${env.EN_SITE_URL}/download/game`,
      locale: locale,
    },
  }
}

export default async function ShopDashboardPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: apps } = await getDownloadByTypeAndLangAction("game", locale)
  const { data: topics } = await getTopicsByLangAction(locale, 1)
  const { data: downloadsCount } = await getDownloadsCountAction()
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "DOWNLOAD_BELOW_HEADER",
  )
  return (
    <DownloadGameContent
      downloads={downloads}
      apps={apps}
      locale={locale}
      topics={topics}
      downloadsCount={downloadsCount}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
