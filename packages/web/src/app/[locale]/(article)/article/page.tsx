import * as React from "react"

import { getAdsByPositionAction } from "@/lib/api/server/ad"
import {
  getArticlesByLangAction,
  getArticlesCountAction,
} from "@/lib/api/server/article"
import { LanguageTypeData } from "@/lib/data-types"

import { ArticleContent } from "./content"

export const revalidate = 60

export default async function ArticlePage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: articles } = await getArticlesByLangAction(locale)
  const { data: articlesCount } = await getArticlesCountAction()
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "ARTICLE_BELOW_HEADER",
  )
  return (
    <ArticleContent
      articles={articles}
      articlesCount={articlesCount}
      adsBelowHeader={adsBelowHeader}
      locale={locale}
    />
  )
}
