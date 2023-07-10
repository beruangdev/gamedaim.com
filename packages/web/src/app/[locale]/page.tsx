import * as React from "react"
import { Metadata } from "next"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { MainContainer } from "@/components/Container/MainContainer"
import { LoadingIndex } from "@/components/Loading"

import { wpGetAllPosts } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { IndexContent } from "./content"
import { LanguageTypeData } from "@/lib/data-types"
import { getMenuByLocation } from "@/lib/api/server/menu"
import { getSettingsSiteAction } from "@/lib/api/server/setting"

export const revalidate = 60

interface IndexPageProps {
  params: {
    locale: LanguageTypeData
  }
}
const { settings } = await getSettingsSiteAction()
export const metadata: Metadata = {
  title: `${settings?.siteTitle || env.SITE_TITTLE} | ${
    settings?.siteTagline || ""
  }`,
  description: settings?.siteDescription || env.DESCRIPTION,
}

export default async function IndexPage({ params }: IndexPageProps) {
  const locale = params.locale

  const { posts, pageInfo } = await wpGetAllPosts(locale.toLocaleUpperCase())
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "HOME_BELOW_HEADER",
  )
  const { data: menus } = await getMenuByLocation("SIDEBAR_ALL")
  const { data: menusByLang } = await getMenuByLocation(
    params.locale === "id" ? "SIDEBAR_ALL_ID" : "SIDEBAR_ALL_EN",
  )
  const { data: menusFooterAll } = await getMenuByLocation("FOOTER_ALL")
  const { data: menusFooterByLang } = await getMenuByLocation(
    params.locale === "id" ? "FOOTER_ID" : "FOOTER_EN",
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
        <MainContainer
          menus={menus}
          menusByLang={menusByLang}
          menusFooterAll={menusFooterAll}
          menusFooterByLang={menusFooterByLang}
        >
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
