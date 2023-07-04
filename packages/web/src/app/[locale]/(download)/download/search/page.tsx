import * as React from "react"
import { type Metadata } from "next"

import env from "env"
import { getDownloadsByLangAction } from "@/lib/api/server/download"
import { DownloadSearchContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Search Download",
    description: "Gamedaim Search Download",
    openGraph: {
      title: "Search Download",
      description: "Gamedaim Search Download",
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/search`
          : `${env.EN_SITE_URL}/download/search`,
      locale: locale,
    },
  }
}

export default async function DownloadByTopicPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)

  return <DownloadSearchContent downloads={downloads} locale={locale} />
}
