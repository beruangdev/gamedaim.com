import * as React from "react"
import { MainContainer } from "@/components/Container/MainContainer"
import { getMenuByLocation } from "@/lib/api/server/menu"
import { LanguageTypeData } from "@/lib/data-types"

interface TopicsLayoutProps {
  children: React.ReactNode
  params: { locale: LanguageTypeData }
}

export const revalidate = 60

export default async function TopicsLayout(props: TopicsLayoutProps) {
  const { children, params } = props
  const { data: menus } = await getMenuByLocation("SIDEBAR_ALL")
  const { data: menusByLang } = await getMenuByLocation(
    params.locale === "id" ? "SIDEBAR_ALL_ID" : "SIDEBAR_ALL_EN",
  )

  const { data: menusFooterAll } = await getMenuByLocation("FOOTER_ALL")
  const { data: menusFooterByLang } = await getMenuByLocation(
    params.locale === "id" ? "FOOTER_ID" : "FOOTER_EN",
  )
  return (
    <MainContainer
      menus={menus}
      menusByLang={menusByLang}
      menusFooterAll={menusFooterAll}
      menusFooterByLang={menusFooterByLang}
    >
      {children}
    </MainContainer>
  )
}
