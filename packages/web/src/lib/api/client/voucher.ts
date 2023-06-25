import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetVouchersCount = () => {
  const { data, error } = useSWR("/voucher/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { vouchersCount: data }
}

export const useGetVouchers = (page = 1) => {
  const { data, error, mutate } = useSWR(`/voucher/page/${page}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { vouchers: data, updatedVouchers: mutate }
}

export const useSearchVouchers = (searchQuery: string) => {
  const { data, error, mutate } = useSWR(
    `/voucher/search/${searchQuery}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { vouchers: data, updatedVouchers: mutate }
}
