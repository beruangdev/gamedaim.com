"use client"

import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetAdsCount = () => {
  const { data, error } = useSWR("/ad/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { adsCount: data }
}

export const useGetAds = (page = 1) => {
  const { data, error, mutate } = useSWR(`/ad/page/${page}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { ads: data, updatedAds: mutate }
}
