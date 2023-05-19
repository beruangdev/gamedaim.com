import { AxiosError } from "axios"
import { toast } from "ui"

import { http } from "@/lib/http"
import { AdDataProps, ErrorResponse } from "@/lib/data-types"

export const getAdsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/ad/count",
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getAdsAction = async (adPage: number) => {
  const [res, err] = await http<AdDataProps[]>("GET", {
    url: `/ad/page/${adPage}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getAdsByPositionAction = async (adPosition: string) => {
  const [res, err] = await http<AdDataProps[]>("GET", {
    url: `/ad/position/${adPosition}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getAdByIdAction = async (adId: string) => {
  const [res, err] = await http<AdDataProps>("GET", {
    url: `/ad/${adId}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const putAdAction = async (adId: string, values: unknown) => {
  const [res, err] = await http<AdDataProps>("PUT", {
    url: `/ad/${adId}`,
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const postAdAction = async (value: unknown) => {
  const [res, err] = await http<AdDataProps>("POST", {
    url: "/ad",
    data: value,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const deleteAdAction = async (adId: string) => {
  const [res, err] = await http<AdDataProps>("DELETE", {
    url: `/ad/${adId}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}
