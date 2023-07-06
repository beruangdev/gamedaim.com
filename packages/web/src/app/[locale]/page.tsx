import * as React from "react"
import { Metadata } from "next"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { MainContainer } from "@/components/Container/MainContainer"
import { LoadingIndex } from "@/components/Loading"

import { wpGetAllPosts } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { IndexContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

interface IndexPageProps {
  params: {
    locale: LanguageTypeData
  }
}

export const metadata: Metadata = {
  title: "Gamedaim.com",
  description: "Gamedaim.com",
}

export default async function IndexPage({ params }: IndexPageProps) {
  const locale = params.locale

  const { posts, pageInfo } = await wpGetAllPosts(locale.toLocaleUpperCase())
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "HOME_BELOW_HEADER",
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
        ]}
      />
      <SiteLinksSearchBoxJsonLd
        useAppDir={true}
        url={locale === "id" ? env.SITE_URL : env.EN_SITE_URL}
        potentialActions={[
          {
            target: `${
              locale === "id" ? env.SITE_URL : env.EN_SITE_URL
            }/search?q`,
            queryInput: "search_term_string",
          },
        ]}
      />
      <React.Suspense fallback={<LoadingIndex />}>
        <MainContainer>
          <IndexContent
            adsBelowHeader={adsBelowHeader}
            posts={posts}
            pageInfo={pageInfo}
            locale={locale}
          />
        </MainContainer>
      </React.Suspense>
    </>
  )
}
