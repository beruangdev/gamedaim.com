"use client"

import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetTopUpTransactionsCount = () => {
  const { data, error } = useSWR("/top-up-transaction/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { topUpTransactionsCount: data }
}
