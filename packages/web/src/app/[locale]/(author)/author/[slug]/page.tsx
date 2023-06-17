import * as React from "react"
import { notFound } from "next/navigation"

import {
  wpGetAllPosts,
  wpGetPostsByAuthorSlug,
} from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { wpGetUserBySlug } from "@/lib/api/server/wp-users"
import { AuthorContent } from "./content"

export const revalidate = 60

export default async function TagPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { user } = await wpGetUserBySlug(slug as string)
  if (!user) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByAuthorSlug(slug as string)
  const { posts: listPosts } = await wpGetAllPosts()
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "TOPIC_BELOW_HEADER",
  )
  return (
    <AuthorContent
      adsBelowHeader={adsBelowHeader}
      posts={posts}
      listPosts={listPosts}
      pageInfo={pageInfo}
      user={user}
      authorSlug={slug}
    />
  )
}
