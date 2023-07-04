import * as React from "react"
import { notFound } from "next/navigation"

import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { wpGetPostsByCategorySlug } from "@/lib/api/server/wp-posts"
import { wpGetCategoryBySlug } from "@/lib/api/server/wp-categories"
import { WpCategoriesDataProps } from "@/lib/wp-data-types"
import { LanguageTypeData } from "@/lib/data-types"
import { CategoryContent } from "./content"
import { Metadata } from "next"
import env from "env"
import { BreadcrumbJsonLd } from "next-seo"

export const revalidate = 60

interface ArticlePageProps {
  categorySlug: string
  locale: LanguageTypeData
}

export async function generateMetadata({
  params,
}: {
  params: ArticlePageProps
}): Promise<Metadata> {
  const { categorySlug, locale } = params

  const { category } = await wpGetCategoryBySlug(categorySlug as string)

  return {
    title: category?.title,
    description: category?.description,
    openGraph: {
      title: category?.title,
      description: category?.description,
      url:
        locale === "id"
          ? `${env.SiTE_URL}/${category?.slug}`
          : `${env.EN_SiTE_URL}/${category?.slug}`,
      locale: locale,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: ArticlePageProps
}) {
  const { categorySlug, locale } = params
  const { category } = await wpGetCategoryBySlug(categorySlug as string)
  if (!category) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByCategorySlug(
    (category as WpCategoriesDataProps).slug,
    locale.toLocaleUpperCase(),
  )

  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "TOPIC_BELOW_HEADER",
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
                ? `${env.SITE_URL}/${category.slug}`
                : `${env.EN_SITE_URL}/${category.slug}`,
          },
        ]}
      />
      <CategoryContent
        category={category}
        posts={posts}
        pageInfo={pageInfo}
        adsBelowHeader={adsBelowHeader}
        locale={locale}
      />
    </>
  )
}
