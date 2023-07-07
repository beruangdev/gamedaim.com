import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import {
  getDownloadByTypeAndLangAction,
  getDownloadsByLangAction,
} from "@/lib/api/server/download"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicsByTypeAndLangAction } from "@/lib/api/server/topic"
import { DownloadPageContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Download",
    description: "Gamedaim Download",
    openGraph: {
      title: "Download",
      description: "Gamedaim Download",
      url:
        locale === "id"
          ? `${env.SITE_URL}/download`
          : `${env.EN_SITE_URL}/download`,
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
  const { data: apps } = await getDownloadByTypeAndLangAction("app", locale)
  const { data: topics } = await getTopicsByTypeAndLangAction(
    locale,
    "DOWNLOAD",
    1,
  )
  const { data: games } = await getDownloadByTypeAndLangAction("game", locale)
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "DOWNLOAD_BELOW_HEADER",
  )

  return (
    <DownloadPageContent
      downloads={downloads}
      apps={apps}
      games={games}
      topics={topics}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
