import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { BreadcrumbJsonLd } from "next-seo"
import env from "env"

import { wpGetTagBySlug } from "@/lib/api/server/wp-tags"
import { wpGetPostsByTagSlug } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"
import { TagContent } from "./content"

export const revalidate = 60

interface TagPageProps {
  slug: string
  locale: LanguageTypeData
}

export async function generateMetadata({
  params,
}: {
  params: TagPageProps
}): Promise<Metadata> {
  const { slug, locale } = params

  const { tag } = await wpGetTagBySlug(slug)

  return {
    title: tag?.title,
    description: tag?.description,
    openGraph: {
      title: tag?.title,
      description: tag?.description,
      url:
        locale === "id"
          ? `${env.SiTE_URL}/tag/${tag?.slug}`
          : `${env.EN_SiTE_URL}/tag/${tag?.slug}`,
      locale: locale,
    },
  }
}

export default async function TagPage({ params }: { params: TagPageProps }) {
  const { slug, locale } = params
  const { tag } = await wpGetTagBySlug(slug)
  if (!tag) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByTagSlug(tag?.slug as string)
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
                ? `${env.SITE_URL}/tag/${tag.slug}`
                : `${env.EN_SITE_URL}/tag/${tag.slug}`,
          },
        ]}
      />
      <TagContent
        adsBelowHeader={adsBelowHeader}
        tag={tag}
        posts={posts}
        pageInfo={pageInfo}
        locale={locale}
      />
    </>
  )
}
