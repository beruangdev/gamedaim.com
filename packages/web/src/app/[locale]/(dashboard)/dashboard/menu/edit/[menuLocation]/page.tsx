import { notFound } from "next/navigation"
import { MenuLocation } from "@/lib/data-types"
import { getMenuByLocation } from "@/lib/api/server/menu"
import { MenuContent } from "./content"

interface MenuByLocationPageProps {
  menuLocation: MenuLocation
}
export default async function MenuByLocationPage({
  params,
}: {
  params: MenuByLocationPageProps
}) {
  const { menuLocation } = params
  const menuDatas = [
    "SIDEBAR_ALL",
    "SIDEBAR_ALL_ID",
    "SIDEBAR_ALL_EN",
    "SIDEBAR_SHOP_ALL",
    "SIDEBAR_SHOP_EN",
    "SIDEBAR_SHOP_ID",
    "FOOTER_ALL",
    "FOOTER_ID",
    "FOOTER_EN",
    "FOOTER_SHOP_ALL",
    "FOOTER_SHOP_ID",
    "FOOTER_SHOP_EN",
  ]
  if (!menuDatas.includes(menuLocation)) {
    notFound()
  }
  const { data: menus } = await getMenuByLocation(menuLocation)

  return <MenuContent initialMenus={menus} location={menuLocation} />
}
