import { AxiosError } from "axios"

import { http } from "@/lib/http"
import { ErrorResponse, MenuDataProps, MenuLocation } from "@/lib/data-types"

export const getMenusCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/menu/count",
  })

  if (err !== null) {
    console.log(err)
    return { data: null, error: err.message }
  }

  return { data: res, error: null }
}

export const getMenus = async (menuPage = 1) => {
  const [res, err] = await http<MenuDataProps[]>("GET", {
    url: `/menu/page/${menuPage}`,
  })

  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getMenuById = async (menuId: string) => {
  const [res, err] = await http<MenuDataProps>("GET", {
    url: `/menu/${menuId}`,
  })
  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}
export const getMenuByLocation = async (location: MenuLocation) => {
  const [res, err] = await http<MenuDataProps[]>("GET", {
    url: `/menu/location/${location}`,
  })

  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const postMenu = async (value: unknown) => {
  const [res, err] = await http<MenuDataProps>("POST", {
    url: "/menu",
    data: value,
  })

  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const putMenu = async (menuId: string, value: unknown) => {
  const [res, err] = await http<MenuDataProps>("PUT", {
    url: `/menu/${menuId}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const deleteMenu = async (menuId: unknown) => {
  const [res, err] = await http<MenuDataProps>("DELETE", {
    url: `/menu/${menuId}`,
  })

  if (err !== null) {
    console.log(err)

    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}
