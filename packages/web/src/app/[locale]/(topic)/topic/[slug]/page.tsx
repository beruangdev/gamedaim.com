import * as React from "react"
import { notFound } from "next/navigation"

import { getAdsByPositionAction } from "@/lib/api/server/ad"
import {
  getTopicArticlesBySlugAction,
  getTopicDownloadsBySlugAction,
} from "@/lib/api/server/topic"
import { TopicContent } from "./content"

export const revalidate = 60

interface TopicSlugPageProps {
  params: {
    slug: string
  }
}

export default async function TopicSlugPage({ params }: TopicSlugPageProps) {
  const { slug } = params
  const { data: topicArticle } = await getTopicArticlesBySlugAction(
    slug as string,
    1,
  )
  const { data: topicDownload } = await getTopicDownloadsBySlugAction(
    slug as string,
    1,
  )

  if (!topicDownload && !topicArticle) {
    notFound()
  }
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "TOPIC_BELOW_HEADER",
  )
  return (
    <TopicContent
      topicArticle={topicArticle}
      topicDownload={topicDownload}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
