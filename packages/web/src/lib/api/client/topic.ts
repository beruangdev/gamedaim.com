import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"
import { LanguageTypeData } from "@/lib/data-types"

export const useGetTopicsCount = () => {
  const { data, error } = useSWR("/topic/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { topicsCount: data }
}
export const useGetTopicsCountByLang = (lang: LanguageTypeData) => {
  const { data, error } = useSWR(`/topic/${lang}/count`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { topicsCount: data }
}
export const useGetTopics = (topicLanguage: LanguageTypeData, page = 1) => {
  const { data, error, mutate } = useSWR(
    `/topic/${topicLanguage}/page/${page}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { topics: data, updatedTopics: mutate }
}

export const useSearchDashboardTopics = (
  topicLanguage: LanguageTypeData,
  query: string,
) => {
  const { data, error, mutate } = useSWR(
    `/topic/${topicLanguage}/search/dashboard/${query}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { topics: data, updatedTopics: mutate }
}
