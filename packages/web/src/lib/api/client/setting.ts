"use client"

import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetSettingValue = (value: string) => {
  const { data, error } = useSWR(`/setting/${value}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { settingValue: data }
}
