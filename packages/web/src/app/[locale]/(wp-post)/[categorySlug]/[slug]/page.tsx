import * as React from "react"
import { notFound } from "next/navigation"

import { wpGetAllPosts, wpGetPostBySlug } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"

import { PostContent } from "./content"

export const revalidate = 60

interface PostPageProps {
  params: { slug: string; categorySlug: string; locale: LanguageTypeData }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = params
  const { posts } = await wpGetAllPosts(locale.toLocaleUpperCase())
  const { post } = await wpGetPostBySlug(slug as string)

  if (!post) {
    notFound()
  }
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "ARTICLE_BELOW_HEADER",
  )
  const { data: adsSingleArticleAbove } = await getAdsByPositionAction(
    "SINGLE_ARTICLE_ABOVE_CONTENT",
  )
  const { data: adsSingleArticleBelow } = await getAdsByPositionAction(
    "SINGLE_ARTICLE_BELOW_CONTENT",
  )
  const { data: adsSingleArticleInline } = await getAdsByPositionAction(
    "SINGLE_ARTICLE_MIDDLE_CONTENT",
  )
  const { data: adsSingleArticlePopUp } = await getAdsByPositionAction(
    "SINGLE_ARTICLE_POP_UP",
  )
  return (
    <PostContent
      posts={posts}
      post={post}
      adsBelowHeader={adsBelowHeader}
      adsSingleArticleAbove={adsSingleArticleAbove}
      adsSingleArticleBelow={adsSingleArticleBelow}
      adsSingleArticleInline={adsSingleArticleInline}
      adsSingleArticlePopUp={adsSingleArticlePopUp}
    />
  )
}
