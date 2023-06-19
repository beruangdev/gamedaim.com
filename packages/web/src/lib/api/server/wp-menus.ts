import { WP_GetMenusByName, Wp_PrimaryMenus } from "@/data/wp-menus"
import { ErrorResponse } from "@/lib/data-types"
import { wpHttp } from "@/lib/http"
import { WpMenusProps, WpResMenusProps } from "@/lib/wp-data-types"
import { AxiosError } from "axios"

export async function wpGetPrimaryMenus() {
  const [res, err] = await wpHttp<{ data: WpResMenusProps }>(
    "GET",
    Wp_PrimaryMenus,
  )
  if (err !== null) {
    console.log(err)

    return {
      menu: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const menu = res?.data.menu.menuItems.edges.map(
    ({ node = {} }) => node,
  ) as WpMenusProps[]

  return {
    menu: Array.isArray(menu) && menu,
    error: null,
  }
}

export async function wpGetMenusByName(id: string) {
  const [res, err] = await wpHttp<{ data: WpResMenusProps }>(
    "GET",
    WP_GetMenusByName,
    { id },
  )
  if (err !== null) {
    console.log(err)

    return {
      menu: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const menu = res?.data.menu.menuItems.edges.map(
    ({ node = {} }) => node,
  ) as WpMenusProps[]

  return {
    menu: Array.isArray(menu) && menu,
    error: null,
  }
}
