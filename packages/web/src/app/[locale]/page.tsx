import * as React from "react"
import NextLink from "next/link"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { Container } from "@/components/UI/Container"
import { Footer } from "@/components/Footer"
import { TopNav } from "@/components/Navigation"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

const { data: siteDomain } = await getSettingByKeyAction("siteDomain")

export default async function IndexPage() {
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
      <TopNav />
      <Container className="mt-20 min-h-screen px-2 lg:px-72">
        <NextLink href="/dashboard">dashboard</NextLink>
        <div className="text-success">Index</div>
      </Container>
      <Footer />
    </>
  )
}
