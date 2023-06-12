import * as React from "react"

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

  return <DownloadsByTopicContent topicDownload={topicDownload} />
}
