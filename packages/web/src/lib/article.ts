import useSWR from "swr"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { http, fetcher } from "@/lib/http"
import {
  ArticleDataProps,
  ArticleSitemapDataProps,
  ErrorResponse,
} from "./data-types"

export const getArticlesCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/article/count",
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

export const getArticles = async (articlePage = 1) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/page/${articlePage}`,
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

export const getArticlesDashboard = async (articlePage = 1) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/page/${articlePage}`,
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

export const getArticlesSitemap = async (articlePage = 1) => {
  const [res, err] = await http<ArticleSitemapDataProps[]>("GET", {
    url: `/article/sitemap/page/${articlePage}`,
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

export const searchArticles = async (articleQuery: string) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/search/${articleQuery}`,
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

export const getArticleById = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/${articleId}`,
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

export const getArticleBySlug = async (articleSlug: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/slug/${articleSlug}`,
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

export const postArticle = async (values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("POST", {
    url: `/article`,
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

export const putArticle = async (articleId: string, values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("PUT", {
    url: `/article/${articleId}`,
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

export const deleteArticle = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("DELETE", {
    url: `/article/${articleId}`,
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

export const useGetArticlesCount = (): { articlesCount: number } => {
  const { data } = useSWR("/article/count", fetcher)
  return { articlesCount: data }
}
