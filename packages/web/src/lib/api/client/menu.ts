import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"
import { MenuLocation } from "@/lib/data-types"

export const useGetMenusCount = () => {
  const { data, error } = useSWR("/menu/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { menusCount: data }
}

export const useGetMenus = (page = 1) => {
  const { data, error, mutate } = useSWR(`/menu/page/${page}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { menus: data, updatedMenus: mutate }
}

export const useGetMenusByLocation = (location: MenuLocation) => {
  const { data, error, mutate } = useSWR(`/menu/location/${location}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { menus: data, updatedMenus: mutate }
}

export const useSearchMenus = (searchQuery: string) => {
  const { data, error, mutate } = useSWR(`/menu/search/${searchQuery}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { menus: data, updatedMenus: mutate }
}
