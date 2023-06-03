import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"
import { LanguageTypeData } from "@/lib/data-types"

export const useGetArticlesCount = () => {
  const { data, error } = useSWR("/article/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { articlesCount: data }
}

export const useGetArticles = (articleLanguage: LanguageTypeData, page = 1) => {
  const { data, error, mutate } = useSWR(
    `/article/${articleLanguage}/page/${page}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { articles: data, updatedArticles: mutate }
}

export const useSearchDashboardArticles = (
  articleLanguage: LanguageTypeData,
  query: string,
) => {
  const { data, error, mutate } = useSWR(
    `/article/${articleLanguage}/search/dashboard/${query}`,
    fetcher,
  )

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { articles: data, updatedArticles: mutate }
}
