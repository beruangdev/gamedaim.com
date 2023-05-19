"use client"

import useSWR from "swr"

import { fetcher } from "@/lib/http"

export const useGetCommentsCount = (): { commentsCount: number } => {
  const { data } = useSWR("/comment/count", fetcher)
  return { commentsCount: data }
}
