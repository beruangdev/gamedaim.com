"use client"

import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

import { fetcher } from "@/lib/http"
import { getKeyMediasAction } from "@/lib/api/server/media"

export const useGetMediasCount = (): { mediasCount: number } => {
  const { data } = useSWR("/media/count", fetcher)
  return { mediasCount: data }
}

export function useInfiniteMedias() {
  const { data, size, setSize, mutate } = useSWRInfinite(
    getKeyMediasAction,
    fetcher,
  )

  return {
    medias: data,
    page: size,
    setPage: setSize,
    updateMedias: mutate,
  }
}
