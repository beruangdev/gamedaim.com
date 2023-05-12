import useSWR from "swr"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { http, fetcher } from "./http"
import { AdDataProps, ErrorResponse } from "./data-types"

export const getAdsCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/ad/count",
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const getAds = async (adPage: number) => {
  const [res, err] = await http<AdDataProps[]>("GET", {
    url: `/ad/page/${adPage}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const getAdsByPosition = async (adPosition: string) => {
  const [res, err] = await http<AdDataProps[]>("GET", {
    url: `/ad/position/${adPosition}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const getAdById = async (adId: string) => {
  const [res, err] = await http<AdDataProps>("GET", {
    url: `/ad/${adId}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const putAd = async (adId: string, values: unknown) => {
  const [res, err] = await http<AdDataProps>("PUT", {
    url: `/ad/${adId}`,
    data: values,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const postAd = async (value: unknown) => {
  const [res, err] = await http<AdDataProps>("POST", {
    url: "/ad",
    data: value,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const deleteAd = async (adId: string) => {
  const [res, err] = await http<AdDataProps>("DELETE", {
    url: `/ad/${adId}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    console.log(err)
    return
  }

  return res
}

export const useGetAdsCount = () => {
  const { data } = useSWR("/ad/count", fetcher)
  return { adsCount: data }
}
