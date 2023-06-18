import { AxiosError } from "axios"
import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher, http } from "@/lib/http"
import { ErrorResponse, VoucherDataProps } from "@/lib/data-types"

export const getVouchersCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/voucher/count",
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: err.message,
    })
    return
  }

  return res
}

export const getVouchers = async (voucherPage = 1) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/page/${voucherPage}`,
  })
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }
  return res
}

export const getVoucherById = async (voucherId: string) => {
  const [res, err] = await http<VoucherDataProps>("GET", {
    url: `/voucher/${voucherId}`,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const getVoucherByCode = async (code: string) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/code/${code}`,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const postVoucher = async (value: unknown) => {
  const [res, err] = await http<VoucherDataProps>("POST", {
    url: "/voucher",
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const putVoucher = async (voucherId: string, value: unknown) => {
  const [res, err] = await http<VoucherDataProps>("PUT", {
    url: `/voucher/${voucherId}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const deleteVoucher = async (voucherId: unknown) => {
  const [res, err] = await http<VoucherDataProps>("DELETE", {
    url: `/voucher/${voucherId}`,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const searchVoucher = async (voucherQuery: string) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/search/${voucherQuery}`,
  })

  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return
  }

  return res
}

export const useGetVouchersCount = () => {
  const { data } = useSWR("/voucher/count", fetcher)
  return { vouchersCount: data }
}
