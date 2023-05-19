"use client"

import useSWR from "swr"

import { fetcher } from "@/lib/http"

export const useGetArticlesCount = (): { articlesCount: number } => {
  const { data } = useSWR("/article/count", fetcher)
  return { articlesCount: data }
}
