import { AxiosError } from "axios"

import { ErrorResponse, SettingDataProps } from "@/lib/data-types"
import { http } from "@/lib/http"

export const getSettingByKeyAction = async (settingKey: string) => {
  const [res, err] = await http<SettingDataProps>("GET", {
    url: `/setting/${settingKey}`,
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

export const postSettingAction = async (values: unknown) => {
  const [res, err] = await http<SettingDataProps>("POST", {
    url: `/setting`,
    data: values,
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

export const getSettingsSiteAction = async () => {
  const { data: siteTitle } = await getSettingByKeyAction("siteTitle")
  const { data: siteTagline } = await getSettingByKeyAction("siteTagline")
  const { data: siteDescription } = await getSettingByKeyAction(
    "siteDescription",
  )
  const { data: siteMetaTitle } = await getSettingByKeyAction("siteMetaTitle")
  const { data: siteMetaDescription } = await getSettingByKeyAction(
    "siteMetaDescription",
  )
  const { data: siteDomain } = await getSettingByKeyAction("siteDomain")
  const { data: emailShop } = await getSettingByKeyAction("emailShop")

  return {
    siteTitle,
    siteTagline,
    siteDescription,
    siteMetaTitle,
    siteMetaDescription,
    siteDomain,
    emailShop,
  }
}
