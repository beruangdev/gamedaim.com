import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import env from "env"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicArticlesBySlugAction } from "@/lib/api/server/topic"
import { TopicArticleContent } from "./content"
import { BreadcrumbJsonLd } from "next-seo"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { slug, locale } = params

  const { data: topicArticle } = await getTopicArticlesBySlugAction(slug, 1)

  return {
    title: topicArticle?.metaTitle || topicArticle?.title,
    description: topicArticle?.metaDescription || topicArticle?.description,
    openGraph: {
      title: topicArticle?.title,
      description: topicArticle?.metaDescription || topicArticle?.description,
      url:
        locale === "id"
          ? `${env.SiTE_URL}/article/topic/${topicArticle?.slug}`
          : `${env.EN_SiTE_URL}/article/topic/${topicArticle?.slug}`,
      locale: topicArticle?.language,
    },
  }
}

export default async function TopicArticlePage({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}) {
  const { slug, locale } = params
  const { data: topicArticle } = await getTopicArticlesBySlugAction(slug, 1)

  if (!topicArticle) {
    notFound()
  }
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
          {
            position: 4,
            name: topicArticle?.metaTitle || topicArticle?.title,
            item:
              locale === "id"
                ? `${env.SITE_URL}/article/topic/${topicArticle?.slug}`
                : `${env.EN_SITE_URL}/article/topic/${topicArticle?.slug}`,
          },
        ]}
      />
      <TopicArticleContent
        topicArticle={topicArticle}
        adsBelowHeader={adsBelowHeader}
      />
    </>
  )
}
