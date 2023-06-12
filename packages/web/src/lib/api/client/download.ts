import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"
import { LanguageTypeData } from "@/lib/data-types"

export const useGetDownloadsCount = () => {
  const { data, error } = useSWR("/download/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { downloadsCount: data }
}

export const useGetDownloadsCountByLang = (locale: LanguageTypeData) => {
  const { data, error } = useSWR(`/download/${locale}/count`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { downloadsCount: data }
}

export const useGetDownloads = (
  downloadLanguage: LanguageTypeData,
  page = 1,
) => {
  const { data, error, mutate } = useSWR(
    `/download/${downloadLanguage}/page/${page}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { downloads: data, updatedDownloads: mutate }
}

export const useSearchDashboardDownloads = (
  downloadLanguage: LanguageTypeData,
  query: string,
) => {
  const { data, error, mutate } = useSWR(
    `/download/${downloadLanguage}/search/dashboard/${query}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { downloads: data, updatedDownloads: mutate }
}
