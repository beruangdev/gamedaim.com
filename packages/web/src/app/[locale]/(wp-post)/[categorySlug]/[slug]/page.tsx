import * as React from "react"
import { notFound } from "next/navigation"

import { wpGetAllPosts, wpGetPostBySlug } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"

import { PostContent } from "./content"
import env from "env"
import { Metadata } from "next"
import { splitUriWP, wpPrimaryCategorySlug } from "@/utils/helper"
import { BreadcrumbJsonLd } from "next-seo"
import { WpCategoriesDataProps } from "@/lib/wp-data-types"

export const revalidate = 60

interface PostPageProps {
  params: { slug: string; categorySlug: string; locale: LanguageTypeData }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { slug } = params

  const locale = params.locale

  const { post } = await wpGetPostBySlug(slug as string)
  const link = splitUriWP(post?.uri as string)
  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      url:
        locale === "id"
          ? `${env.SITE_URL}${link}`
          : `${env.EN_SITE_URL}${link}`,

      locale: locale,
    },
  }
}
export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = params
  const { posts } = await wpGetAllPosts(locale.toLocaleUpperCase())
  const { post } = await wpGetPostBySlug(slug as string)
  const { primary } = wpPrimaryCategorySlug(
    post?.categories as WpCategoriesDataProps[],
  )
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
                ? `${env.SITE_URL}/${primary.slug}`
                : `${env.EN_SITE_URL}/${primary.slug}`,
          },
          {
            position: 3,
            name: primary?.title,
            item:
              locale === "id"
                ? `${env.SITE_URL}/${primary.slug}/${post.slug}`
                : `${env.EN_SITE_URL}/${primary.slug}/${post.slug}`,
          },
        ]}
      />

      <PostContent
        locale={locale}
        posts={posts}
        post={post}
        adsBelowHeader={adsBelowHeader}
        adsSingleArticleAbove={adsSingleArticleAbove}
        adsSingleArticleBelow={adsSingleArticleBelow}
        adsSingleArticleInline={adsSingleArticleInline}
        adsSingleArticlePopUp={adsSingleArticlePopUp}
      />
    </>
  )
}
