import * as React from "react"
import { notFound } from "next/navigation"

import { wpGetTagBySlug } from "@/lib/api/server/wp-tags"
import { wpGetPostsByTagSlug } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { TagContent } from "./content"

export const revalidate = 60

export default async function TagPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { tag } = await wpGetTagBySlug(slug)
  if (!tag) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByTagSlug(tag?.slug as string)
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "TOPIC_BELOW_HEADER",
  )
  return (
    <TagContent
      adsBelowHeader={adsBelowHeader}
      tag={tag}
      posts={posts}
      pageInfo={pageInfo}
    />
  )
}
