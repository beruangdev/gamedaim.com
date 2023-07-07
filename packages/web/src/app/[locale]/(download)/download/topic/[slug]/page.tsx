import * as React from "react"
import { notFound } from "next/navigation"
import { type Metadata } from "next"

import env from "env"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicDownloadsBySlugAction } from "@/lib/api/server/topic"
import { DownloadsByTopicContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale, slug } = params

  const { data: topicDownload } = await getTopicDownloadsBySlugAction(
    slug as string,
    1,
  )

  return {
    title: topicDownload?.metaTitle || topicDownload?.title,
    description: topicDownload?.metaDescription || topicDownload?.description,
    openGraph: {
      title: topicDownload?.metaTitle || topicDownload?.title,
      description: topicDownload?.metaDescription || topicDownload?.description,
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/app/${slug}`
          : `${env.EN_SITE_URL}/download/app/${slug}`,
      locale: locale,
    },
  }
}

export default async function DownloadByTopicPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data: topicDownload } = await getTopicDownloadsBySlugAction(
    slug as string,
    1,
  )
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "DOWNLOAD_BELOW_HEADER",
  )
  if (!topicDownload) {
    notFound()
  }
  return (
    <DownloadsByTopicContent
      topicDownload={topicDownload}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
