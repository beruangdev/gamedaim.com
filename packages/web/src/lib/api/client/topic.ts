"use client"

import useSWR from "swr"

import { fetcher } from "@/lib/http"

export const useGetTopicsCount = () => {
  const { data } = useSWR("/topic/count", fetcher)
  return { topicsCount: data }
}
