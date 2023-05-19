"use client"

import useSWR from "swr"

import { fetcher } from "@/lib/http"

export const useGetAdsCount = () => {
  const { data } = useSWR("/ad/count", fetcher)
  return { adsCount: data }
}
