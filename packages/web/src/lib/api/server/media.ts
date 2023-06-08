import { AxiosError } from "axios"

import { http } from "@/lib/http"
import { ErrorResponse, MediaDataProps } from "@/lib/data-types"

export const getMediasCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/media/count",
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getMediasAction = async (mediaPage = 1) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/page/${mediaPage}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getMediaByIdAction = async (mediaId: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/${mediaId}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getMediaBySlugAction = async (mediaSlug: string) => {
  const [res, err] = await http<MediaDataProps>("GET", {
    url: `/media/slug/${mediaSlug}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const searchMediaAction = async (mediaQuery: string) => {
  const [res, err] = await http<MediaDataProps[]>("GET", {
    url: `/media/search/${mediaQuery}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const postMediaAction = async (mediaImage: unknown) => {
  const [res, err] = await http<MediaDataProps>("POST", {
    url: "/media/image",
    data: mediaImage,
    headers: { "Content-Type": "multipart/form-data" },
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}
export const postMultipleMediaAction = async (mediaImage: unknown) => {
  const [res, err] = await http<MediaDataProps>("POST", {
    url: "/media/images",
    data: mediaImage,
    headers: { "Content-Type": "multipart/form-data" },
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const putMediaAction = async (mediaId: string, values: unknown) => {
  const [res, err] = await http<MediaDataProps>("PUT", {
    url: `/media/${mediaId}`,
    data: values,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const deleteMediaAction = async (mediaName: string) => {
  const [res, err] = await http<MediaDataProps>("DELETE", {
    url: `/media/name/${mediaName}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getKeyMediasAction = (
  pageIndex: number,
  previousPageData: string | string[],
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/media/dashboard/page/${pageIndex + 1}`
}
