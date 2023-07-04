import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import {
  getDownloadByTypeAndLangAction,
  getDownloadsByLangAction,
  getDownloadsCountAction,
} from "@/lib/api/server/download"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicsByLangAction } from "@/lib/api/server/topic"
import { type LanguageTypeData } from "@/lib/data-types"

import { DownloadAppContent } from "./content"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Download App",
    description: "Gamedaim Download App",
    openGraph: {
      title: "Download App",
      description: "Gamedaim Download App",
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/app`
          : `${env.EN_SITE_URL}/download/app`,
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
