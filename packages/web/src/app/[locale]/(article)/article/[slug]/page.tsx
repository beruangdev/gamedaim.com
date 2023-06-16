import * as React from "react"
import { notFound } from "next/navigation"

import {
  getArticlesByLangAction,
  getArticlesBySlugAction,
} from "@/lib/api/server/article"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"

import SingleArticleContent from "./content"

export const revalidate = 60

interface ArticleSlugPageProps {
  params: {
    slug: string
    locale: LanguageTypeData
  }
}

export default async function ArticleSlugPage({
  params,
}: ArticleSlugPageProps) {
  const { locale, slug } = params
  const { data: article } = await getArticlesBySlugAction(slug as string)
  if (!article) {
    notFound()
  }
  const { data: articles } = await getArticlesByLangAction(locale)
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
    <SingleArticleContent
      article={article}
      articles={articles}
      adsBelowHeader={adsBelowHeader}
      adsSingleArticleAbove={adsSingleArticleAbove}
      adsSingleArticleBelow={adsSingleArticleBelow}
      adsSingleArticleInline={adsSingleArticleInline}
      adsSingleArticlePopUp={adsSingleArticlePopUp}
    />
  )
}
