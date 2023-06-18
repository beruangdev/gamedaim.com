import * as React from "react"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { getSettingByKeyAction } from "@/lib/api/server/setting"
import { MainContainer } from "@/components/Container/MainContainer"
import { IndexContent } from "./content"
import { wpGetAllPosts } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"

export default async function IndexPage() {
  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")
  const { posts, pageInfo } = await wpGetAllPosts()
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
        />
      </MainContainer>
    </>
  )
}
