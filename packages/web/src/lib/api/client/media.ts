"use client"

import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

import { toast } from "@/components/UI/Toast"

import { fetcher } from "@/lib/http"
import { getKeyMediasAction } from "@/lib/api/server/media"

export const useGetMediasCount = (): { mediasCount: number } => {
  const { data, error } = useSWR("/media/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { mediasCount: data }
}

export function useInfiniteMedias() {
  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKeyMediasAction,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return {
    medias: data,
    page: size,
    setPage: setSize,
    updateMedias: mutate,
  }
}
export function useSearchMedias(query: string | null) {
  const { data, mutate, error } = useSWR(
    query ? `/media/search/${query}` : null,
    fetcher,
  )
  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }
  return {
    resultsMedias: data,
    updateResultsMedias: mutate,
  }
}
