import useSWR from "swr"
import useSWRInfinite from "swr/infinite"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { fetcher, http } from "@/lib/http"
import { ErrorResponse, MediaDataProps } from "./data-types"

export const getMediasCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/media/count",
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

export const getMedias = async (mediaPage = 1) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/page/${mediaPage}`,
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

export const getMediaById = async (mediaId: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/${mediaId}`,
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

export const getMediaBySlug = async (mediaSlug: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/slug/${mediaSlug}`,
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

export const searchMedia = async (mediaQuery: string) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/search/${mediaQuery}`,
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

export const postMedia = async (mediaImage: unknown) => {
  const [res, err] = await http<MediaDataProps>("POST", {
    url: "/media/image",
    data: mediaImage,
    headers: { "Content-Type": "multipart/form-data" },
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

export const putMedia = async (mediaId: string, values: unknown) => {
  const [res, err] = await http<MediaDataProps>("PUT", {
    url: `/media/${mediaId}`,
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

export const deleteMedia = async (mediaName: string) => {
  const [res, err] = await http<MediaDataProps>("DELETE", {
    url: `/media/name/${mediaName}`,
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

export const getKeyMedias = (
  pageIndex: number,
  previousPageData: string | string[],
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/media/dashboard/page/${pageIndex + 1}`
}

export const useGetMediasCount = (): { mediasCount: number } => {
  const { data } = useSWR("/media/count", fetcher)
  return { mediasCount: data }
}

export function useInfiniteMedias() {
  const { data, size, setSize, mutate } = useSWRInfinite(getKeyMedias, fetcher)

  return {
    medias: data,
    page: size,
    setPage: setSize,
    updateMedias: mutate,
  }
}
