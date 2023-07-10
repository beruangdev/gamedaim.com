import { AxiosError } from "axios"

import {
  ErrorResponse,
  SettingDataProps,
  SettingsSiteProps,
} from "@/lib/data-types"
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
  const { data } = await getSettingByKeyAction("settings")
  let settingsValue: SettingsSiteProps | undefined
  if (data) {
    const parsedData = JSON.parse(data.value)
    settingsValue = parsedData
  }

  return {
    settings: settingsValue,
  }
}
