import { AxiosError } from "axios"

import { http } from "@/lib/http"
import { DownloadFileDataProps, ErrorResponse } from "@/lib/data-types"

export const getDownloadFilesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/download-file/count",
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

export const getDownloadFilesAction = async (downloadFilePage: number) => {
  const [res, err] = await http<DownloadFileDataProps[]>("GET", {
    url: `/download-file/page/${downloadFilePage}`,
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

export const getDownloadFileByIdAction = async (downloadFileId: string) => {
  const [res, err] = await http<DownloadFileDataProps>("GET", {
    url: `/download-file/${downloadFileId}`,
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
export const getDownloadFileBySlugAction = async (downloadFileSlug: string) => {
  const [res, err] = await http<DownloadFileDataProps>("GET", {
    url: `/download-file/slug/${downloadFileSlug}`,
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
export const putDownloadFileAction = async (
  downloadFileId: string,
  values: unknown,
) => {
  const [res, err] = await http<DownloadFileDataProps>("PUT", {
    url: `/download-file/${downloadFileId}`,
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

export const postDownloadFileAction = async (value: unknown) => {
  const [res, err] = await http<DownloadFileDataProps>("POST", {
    url: "/download-file",
    data: value,
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

export const deleteDownloadFileAction = async (downloadFileId: string) => {
  const [res, err] = await http<DownloadFileDataProps>("DELETE", {
    url: `/download-file/${downloadFileId}`,
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
