import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { ErrorResponse, SettingDataProps } from "@/lib/data-types"
import { http } from "@/lib/http"

export const getSettingByKeyAction = async (settingKey: string) => {
  const [res, err] = await http<SettingDataProps[]>("GET", {
    url: `/setting/${settingKey}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const postSettingAction = async (values: unknown) => {
  const [res, err] = await http<SettingDataProps[]>("POST", {
    url: `/setting`,
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getSettingsSiteAction = async () => {
  const title = await getSettingByKeyAction("title")
  const description = await getSettingByKeyAction("description")
  const tagline = await getSettingByKeyAction("tagline")
  const domain = await getSettingByKeyAction("domain")
  const signup = await getSettingByKeyAction("signup")

  return {
    title: title || "",
    description: description || "",
    tagline: tagline || "",
    domain: domain || "",
    signup: signup || "",
  }
}
