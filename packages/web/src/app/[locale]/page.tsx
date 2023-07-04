import * as React from "react"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { MainContainer } from "@/components/Container/MainContainer"

import { getSettingByKeyAction } from "@/lib/api/server/setting"
import { wpGetAllPosts } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { IndexContent } from "./content"
import { LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

export default async function IndexPage({
  params,
}: {
  params: { locale: LanguageTypeData }
}) {
  const { locale } = params
  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")
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
            name: siteDomain?.value || env.DOMAIN,
            item: `https://${siteDomain?.value || env.DOMAIN}`,
          },
        ]}
      />
      <SiteLinksSearchBoxJsonLd
        useAppDir={true}
        url={`https://${siteDomain?.value || env.DOMAIN}/`}
        potentialActions={[
          {
            target: `https://${siteDomain?.value || env.DOMAIN}/search?q`,
            queryInput: "search_term_string",
          },
        ]}
      />
      <MainContainer>
        <IndexContent
          adsBelowHeader={adsBelowHeader}
          posts={posts}
          pageInfo={pageInfo}
          locale={locale}
        />
      </MainContainer>
    </>
  )
}
