import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { http } from "@/lib/http"
import {
  ArticleDataProps,
  ArticleSitemapDataProps,
  ErrorResponse,
} from "@/lib/data-types"

export const getArticlesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/article/count",
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

export const getArticlesAction = async (articlePage = 1) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/page/${articlePage}`,
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

export const getARticlesDashboardAction = async (articlePage = 1) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/page/${articlePage}`,
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

export const getArticlesSitemapAction = async (articlePage = 1) => {
  const [res, err] = await http<ArticleSitemapDataProps[]>("GET", {
    url: `/article/sitemap/page/${articlePage}`,
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

export const searchArticlesAction = async (articleQuery: string) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/search/${articleQuery}`,
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

export const getArticleByIdAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/${articleId}`,
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

export const getArticlesBySlugAction = async (articleSlug: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/slug/${articleSlug}`,
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

export const postArticleAction = async (values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("POST", {
    url: `/article`,
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

export const putArticle = async (articleId: string, values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("PUT", {
    url: `/article/${articleId}`,
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

export const deleteArticleAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("DELETE", {
    url: `/article/${articleId}`,
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
