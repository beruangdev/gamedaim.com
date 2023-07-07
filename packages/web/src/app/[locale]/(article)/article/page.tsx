import * as React from "react"
import { Metadata } from "next"
import { BreadcrumbJsonLd } from "next-seo"

import env from "env"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import {
  getArticlesByLangAction,
  getArticlesCountAction,
} from "@/lib/api/server/article"
import { LanguageTypeData } from "@/lib/data-types"
import { ArticleContent } from "./content"

export const metadata: Metadata = {
  title: "Article",
  description: "Article",
}

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
    <>
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: locale === "id" ? env.DOMAIN : env.EN_SUBDOMAIN,
          },
          {
            position: 2,
            name:
              locale === "id"
                ? `${env.SITE_URL}/article`
                : `${env.EN_SITE_URL}/article`,
          },
        ]}
      />
      <ArticleContent
        articles={articles}
        articlesCount={articlesCount}
        adsBelowHeader={adsBelowHeader}
        locale={locale}
      />
    </>
  )
}
