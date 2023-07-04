import * as React from "react"
import { notFound } from "next/navigation"

import {
  wpGetAllPosts,
  wpGetPostsByAuthorSlug,
} from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"
import { wpGetUserBySlug } from "@/lib/api/server/wp-users"
import { AuthorContent } from "./content"

export const revalidate = 60

export default async function TagPage({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}) {
  const { slug, locale } = params
  const { user } = await wpGetUserBySlug(slug as string)
  if (!user) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByAuthorSlug(
    slug as string,
    "",
    locale.toLocaleUpperCase(),
  )
  const { posts: listPosts } = await wpGetAllPosts(locale.toLocaleUpperCase())
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
      locale={locale}
    />
  )
}
