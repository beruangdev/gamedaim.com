import * as React from "react"
import { ShopContainer } from "@/components/Container/ShopContainer"
import { getMenuByLocation } from "@/lib/api/server/menu"
import { LanguageTypeData } from "@/lib/data-types"

interface ShopLayoutProps {
  children: React.ReactNode
  params: { locale: LanguageTypeData }
}

export const revalidate = 60

export default async function ShopLayout(props: ShopLayoutProps) {
  const { children, params } = props
  const { data: menus } = await getMenuByLocation("SIDEBAR_SHOP_ALL")
  const { data: menusByLang } = await getMenuByLocation(
    params.locale === "id" ? "SIDEBAR_SHOP_ID" : "SIDEBAR_SHOP_EN",
  )
  const { data: menusFooterShopAll } = await getMenuByLocation(
    "FOOTER_SHOP_ALL",
  )
  const { data: menusFooterShopByLang } = await getMenuByLocation(
    params.locale === "id" ? "FOOTER_SHOP_ID" : "FOOTER_SHOP_EN",
  )

  return (
    <ShopContainer
      menus={menus}
      menusByLang={menusByLang}
      menusFooterShopAll={menusFooterShopAll}
      menusFooterShopByLang={menusFooterShopByLang}
    >
      {children}
    </ShopContainer>
  )
}
