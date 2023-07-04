import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import env from "env"
import { BreadcrumbJsonLd } from "next-seo"

import {
  wpGetAllPosts,
  wpGetPostsByAuthorSlug,
} from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"
import { wpGetUserBySlug } from "@/lib/api/server/wp-users"
import { AuthorContent } from "./content"

export const revalidate = 60

interface AuthorPageProps {
  slug: string
  locale: LanguageTypeData
}

export async function generateMetadata({
  params,
}: {
  params: AuthorPageProps
}): Promise<Metadata> {
  const { slug, locale } = params

  const { user } = await wpGetUserBySlug(slug as string)

  return {
    title: user?.title,
    description: user?.description,
    openGraph: {
      title: user?.title,
      description: user?.description,
      url:
        locale === "id"
          ? `${env.SiTE_URL}/author/${user?.slug}`
          : `${env.EN_SiTE_URL}/author/${user?.slug}`,
      locale: locale,
    },
  }
}

export default async function AuthorPage({
  params,
}: {
  params: AuthorPageProps
}) {
  const { slug, locale } = params
  const { user } = await wpGetUserBySlug(slug as string)
  if (!user) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByAuthorSlug(
    slug as string,
    "",
    locale.toLocaleUpperCase(),
  )
  const { posts: listPosts } = await wpGetAllPosts(locale.toLocaleUpperCase())
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
                ? `${env.SITE_URL}/author/${user.slug}`
                : `${env.EN_SITE_URL}/author/${user.slug}`,
          },
        ]}
      />
      <AuthorContent
        adsBelowHeader={adsBelowHeader}
        posts={posts}
        listPosts={listPosts}
        pageInfo={pageInfo}
        user={user}
        authorSlug={slug}
        locale={locale}
      />
    </>
  )
}
