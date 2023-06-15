import * as React from "react"
import { notFound } from "next/navigation"

import { getAdsByPositionAction } from "@/lib/api/server/ad"

import { getTopicArticlesBySlugAction } from "@/lib/api/server/topic"
import { TopicArticleContent } from "./content"

export const revalidate = 60

export default async function TopicArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data: topicArticle } = await getTopicArticlesBySlugAction(slug, 1)

  if (!topicArticle) {
    notFound()
  }
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "ARTICLE_BELOW_HEADER",
  )
  return (
    <TopicArticleContent
      topicArticle={topicArticle}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
