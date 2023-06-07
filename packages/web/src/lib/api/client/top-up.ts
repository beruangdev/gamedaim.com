"use client"

import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetTopUpDigiflazzCheckBalance = () => {
  const { data, error, mutate } = useSWR(
    "/top-up/digiflazz/check-balance",
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return {
    topUpDigiflazzBalance: data,
    updatedTopUpDigiflazzBalance: mutate,
  }
}
