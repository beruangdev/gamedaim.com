import * as React from "react"
import { notFound } from "next/navigation"
import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo"
import { type Metadata } from "next"

import env from "env"
import {
  getArticlesByLangAction,
  getArticlesBySlugAction,
} from "@/lib/api/server/article"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"
import SingleArticleContent from "./content"

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { slug } = params

  const locale = params.locale

  const { data: article } = await getArticlesBySlugAction(slug as string)

  return {
    title: article?.metaTitle || article?.title,
    description: article?.metaDescription || article?.excerpt,
    openGraph: {
      title: article?.title,
      description: article?.metaDescription || article?.excerpt,
      url:
        locale === "id"
          ? `${env.SITE_URL}/article/${article?.slug}`
          : `${env.EN_SITE_URL}/article/${article?.slug}`,
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
            name: locale === "id" ? env.DOMAIN : env.EN_SUBDOMAIN,
            item: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
          },
          {
            position: 2,
            name: "Article",
            item:
              locale === "id"
                ? `${env.SITE_URL}/article`
                : `${env.EN_SITE_URL}/article`,
          },
          {
            position: 3,
            name: article?.topics[0]?.title,
            item:
              locale === "id"
                ? `${env.SITE_URL}/article/topic/${article?.topics[0]?.slug}`
                : `${env.EN_SITE_URL}/article/topic/${article?.topics[0]?.slug}`,
          },
          {
            position: 4,
            name: article?.metaTitle || article?.title,
            item:
              locale === "id"
                ? `${env.SITE_URL}/article/${article?.slug}`
                : `${env.EN_SITE_URL}/article/${article?.slug}`,
          },
        ]}
      />
      <ArticleJsonLd
        useAppDir={true}
        url={
          locale === "id"
            ? `${env.DOMAIN}/${article.slug}`
            : `${env.EN_SITE_URL}/${article.slug}`
        }
        title={article.metaTitle || article.title}
        images={[article.featuredImage.url]}
        datePublished={article.createdAt}
        dateModified={article.createdAt}
        authorName={[
          {
            name: article.authors[0].name,
            url:
              locale === "id"
                ? `${env.SITE_URL}/user/${article.authors[0].username}`
                : `${env.EN_SITE_URL}/user/${article.authors[0].username}`,
          },
        ]}
        publisherName={env.SITE_TITTLE}
        publisherLogo={env.LOGO_URL}
        description={article.metaDescription || article.excerpt}
        isAccessibleForFree={true}
      />
      <SingleArticleContent
        article={article}
        locale={locale}
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
