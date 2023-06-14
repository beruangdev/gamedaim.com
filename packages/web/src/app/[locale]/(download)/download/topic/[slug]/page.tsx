import * as React from "react"
import { notFound } from "next/navigation"

import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicDownloadsBySlugAction } from "@/lib/api/server/topic"

import { DownloadsByTopicContent } from "./content"

export const revalidate = 60

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
