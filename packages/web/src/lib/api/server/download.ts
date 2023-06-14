import { AxiosError } from "axios"

import { http } from "@/lib/http"
import {
  DownloadDataProps,
  DownloadSitemapDataProps,
  ErrorResponse,
  LanguageTypeData,
} from "@/lib/data-types"

export const postDownloadWithPrimaryAction = async (values: unknown) => {
  const [res, err] = await http<DownloadDataProps>("POST", {
    url: `/download/with-primary`,
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

export const postDownloadAction = async (values: unknown) => {
  const [res, err] = await http<DownloadDataProps>("POST", {
    url: `/download`,
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

export const putDownload = async (downloadId: string, values: unknown) => {
  const [res, err] = await http<DownloadDataProps>("PUT", {
    url: `/download/${downloadId}`,
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

export const deleteDownloadWithPrimaryAction = async (downloadId: string) => {
  const [res, err] = await http<DownloadDataProps>("DELETE", {
    url: `/download/with-primary/${downloadId}`,
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

export const deleteDownloadAction = async (downloadId: string) => {
  const [res, err] = await http<DownloadDataProps>("DELETE", {
    url: `/download/${downloadId}`,
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

export const getDownloadByIdAction = async (downloadId: string) => {
  const [res, err] = await http<DownloadDataProps>("GET", {
    url: `/download/${downloadId}`,
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

export const getDownloadPrimaryByIdAction = async (downloadId: string) => {
  const [res, err] = await http<DownloadDataProps>("GET", {
    url: `/download/primary/${downloadId}`,
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

export const getDownloadsByLangAction = async (
  downloadLanguage: LanguageTypeData,
  downloadPage = 1,
) => {
  const [res, err] = await http<DownloadDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/page/${downloadPage}`,
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

export const getDownloadsDashboardByLangAction = async (
  downloadLanguage: LanguageTypeData,
  downloadPage = 1,
) => {
  const [res, err] = await http<DownloadDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/dashboard/page/${downloadPage}`,
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

export const getDownloadsSitemapByLangAction = async (
  downloadLanguage: LanguageTypeData,
  downloadPage = 1,
) => {
  const [res, err] = await http<DownloadSitemapDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/sitemap/page/${downloadPage}`,
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

export const getDownloadsBySlugAction = async (downloadSlug: string) => {
  const [res, err] = await http<DownloadDataProps>("GET", {
    url: `/download/slug/${downloadSlug}/page/1`,
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

export const getDownloadsByAuthorUsernameAndLangAction = async (
  downloadLanguage: LanguageTypeData,
  authorUsername: string,
  downloadPage = 1,
) => {
  const [res, err] = await http<DownloadDataProps>("GET", {
    url: `/download/${downloadLanguage}/author/${authorUsername}/page/${downloadPage}`,
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

export const getDownloadsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/download/count",
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

export const getDownloadPrimariesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/download/count/primary",
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

export const searchDownloadsByLangAction = async (
  downloadLanguage: LanguageTypeData,
  downloadQuery: string,
) => {
  const [res, err] = await http<DownloadDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/search/${downloadQuery}`,
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

export const searchDownloadsDashboardByLangAction = async (
  downloadLanguage: LanguageTypeData,
  downloadQuery: string,
) => {
  const [res, err] = await http<DownloadDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/search/dashboard/${downloadQuery}`,
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

export const getDownloadByTypeAndLangAction = async (
  downloadType: string,
  downloadLanguage: LanguageTypeData,
  downloadPage = 1,
) => {
  const [res, err] = await http<DownloadDataProps[]>("GET", {
    url: `/download/${downloadLanguage}/type/${downloadType}/${downloadPage}`,
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
