import NextLink from "next/link"
export default function MenuContent() {
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
  return (
    <div className="min-h-screen px-4 py-8">
      <h1>List Locations Menu</h1>
      <ul className="mt-3">
        {menuDatas.map((menu) => {
          const title = menu.replace(/_/g, " ")
          return (
            <li className="border-b px-4 py-2">
              <NextLink href={`/dashboard/menu/edit/${menu}`}>{title}</NextLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
