import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { http } from "@/lib/http"
import { ErrorResponse, MediaDataProps } from "@/lib/data-types"

export const getMediasCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/media/count",
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

export const getMediasAction = async (mediaPage = 1) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/page/${mediaPage}`,
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

export const getMediaByIdAction = async (mediaId: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/${mediaId}`,
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

export const getMediaBySlugAction = async (mediaSlug: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/slug/${mediaSlug}`,
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

export const searchMediaAction = async (mediaQuery: string) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/search/${mediaQuery}`,
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

export const postMediaAction = async (mediaImage: unknown) => {
  const [res, err] = await http<MediaDataProps>("POST", {
    url: "/media/image",
    data: mediaImage,
    headers: { "Content-Type": "multipart/form-data" },
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

export const putMediaAction = async (mediaId: string, values: unknown) => {
  const [res, err] = await http<MediaDataProps>("PUT", {
    url: `/media/${mediaId}`,
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

export const deleteMediaAction = async (mediaName: string) => {
  const [res, err] = await http<MediaDataProps>("DELETE", {
    url: `/media/name/${mediaName}`,
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

export const getKeyMediasAction = (
  pageIndex: number,
  previousPageData: string | string[],
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/media/dashboard/page/${pageIndex + 1}`
}
