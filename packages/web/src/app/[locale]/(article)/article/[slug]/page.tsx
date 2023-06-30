import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "next-seo"

import env from "env"
import {
  getArticlesByLangAction,
  getArticlesBySlugAction,
} from "@/lib/api/server/article"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"
import { getSettingByKeyAction } from "@/lib/api/server/setting"
import SingleArticleContent from "./content"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params

  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")
  const { data: article } = await getArticlesBySlugAction(slug as string)

  return {
    title: article?.metaTitle || article?.title,
    description: article?.metaDescription || article?.excerpt,
    openGraph: {
      title: article?.title,
      description: article?.metaDescription || article?.excerpt,
      url: `https://${siteDomain?.value || env.DOMAIN}/article/${
        article?.slug
      }`,
      locale: article?.language,
    },
  }
}

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
  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")

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
            position: 3,
            name: article?.topics[0]?.title,
            item: `https://${siteDomain?.value || env.DOMAIN}/article/topic/${
              article?.topics[0]?.slug
            }`,
          },
          {
            position: 4,
            name: article?.metaTitle || article?.title,
            item: `https://${siteDomain?.value || env.DOMAIN}/article/${
              article?.slug
            }`,
          },
        ]}
      />

      <SingleArticleContent
        article={article}
        articles={articles}
        adsBelowHeader={adsBelowHeader}
        adsSingleArticleAbove={adsSingleArticleAbove}
        adsSingleArticleBelow={adsSingleArticleBelow}
        adsSingleArticleInline={adsSingleArticleInline}
        adsSingleArticlePopUp={adsSingleArticlePopUp}
      />
    </>
  )
}
