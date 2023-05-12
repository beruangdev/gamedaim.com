import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { ErrorResponse, SettingDataProps } from "./data-types"
import { http } from "@/lib/http"

export const getSettingByKey = async (settingKey: string) => {
  const [res, err] = await http<SettingDataProps[]>("GET", {
    url: `/setting/${settingKey}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const postSetting = async (values: unknown) => {
  const [res, err] = await http<SettingDataProps[]>("POST", {
    url: `/setting`,
    data: values,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const getSettingsSite = async () => {
  const title = await getSettingByKey("title")
  const description = await getSettingByKey("description")
  const tagline = await getSettingByKey("tagline")
  const domain = await getSettingByKey("domain")
  const signup = await getSettingByKey("signup")

  return {
    title: title || "",
    description: description || "",
    tagline: tagline || "",
    domain: domain || "",
    signup: signup || "",
  }
}
