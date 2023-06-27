import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import env from "env"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { getTopicArticlesBySlugAction } from "@/lib/api/server/topic"
import { TopicArticleContent } from "./content"
import { getSettingByKeyAction } from "@/lib/api/server/setting"
import { BreadcrumbJsonLd } from "next-seo"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params

  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")
  const { data: topicArticle } = await getTopicArticlesBySlugAction(slug, 1)

  return {
    title: topicArticle?.metaTitle || topicArticle?.title,
    description: topicArticle?.metaDescription || topicArticle?.description,
    openGraph: {
      title: topicArticle?.title,
      description: topicArticle?.metaDescription || topicArticle?.description,
      url: `https://${siteDomain?.value || env.DOMAIN}/article/topic/${
        topicArticle?.slug
      }`,
      locale: topicArticle?.language,
    },
  }
}

export default async function TopicArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { data: topicArticle } = await getTopicArticlesBySlugAction(slug, 1)
  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")

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
            name: siteDomain?.value || env.DOMAIN,
            item: `https://${siteDomain?.value || env.DOMAIN}`,
          },
          {
            position: 2,
            name: "Article",
            item: `https://${siteDomain?.value || env.DOMAIN}/article`,
          },
          {
            position: 4,
            name: topicArticle?.metaTitle || topicArticle?.title,
            item: `https://${siteDomain?.value || env.DOMAIN}/article/topic/${
              topicArticle?.slug
            }`,
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
