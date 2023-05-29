import { AxiosError } from "axios"

import { http } from "@/lib/http"
import {
  ArticleDataProps,
  ArticleSitemapDataProps,
  ErrorResponse,
  LanguageTypeData,
} from "@/lib/data-types"

export const postArticleWithPrimaryAction = async (values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("POST", {
    url: `/article/with-primary`,
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

export const postArticleAction = async (values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("POST", {
    url: `/article`,
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

export const putArticle = async (articleId: string, values: unknown) => {
  const [res, err] = await http<ArticleDataProps>("PUT", {
    url: `/article/${articleId}`,
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

export const deleteArticleWithPrimaryAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("DELETE", {
    url: `/article/with-primary/${articleId}`,
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

export const deleteArticleAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("DELETE", {
    url: `/article/${articleId}`,
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

export const getArticleByIdAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/${articleId}`,
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

export const getArticlePrimaryByIdAction = async (articleId: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/primary/${articleId}`,
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

export const getArticlesByLangAction = async (
  articleLanguage: LanguageTypeData,
  articlePage = 1,
) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/${articleLanguage}/page/${articlePage}`,
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

export const getArticlesDashboardByLangAction = async (
  articleLanguage: LanguageTypeData,
  articlePage = 1,
) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/${articleLanguage}/dashboard/page/${articlePage}`,
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

export const getArticlesSitemapByLangAction = async (
  articleLanguage: LanguageTypeData,
  articlePage = 1,
) => {
  const [res, err] = await http<ArticleSitemapDataProps[]>("GET", {
    url: `/article/${articleLanguage}/sitemap/page/${articlePage}`,
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

export const getArticlesBySlugAction = async (articleSlug: string) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/slug/${articleSlug}`,
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

export const getArticlesByAuthorUsernameAndLangAction = async (
  articleLanguage: LanguageTypeData,
  authorUsername: string,
  articlePage = 1,
) => {
  const [res, err] = await http<ArticleDataProps>("GET", {
    url: `/article/${articleLanguage}/author/${authorUsername}/${articlePage}`,
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

export const getArticlesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/article/count",
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

export const getArticlePrimariesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/article/count/primary",
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

export const searchArticlesByLangAction = async (
  articleLanguage: LanguageTypeData,
  articleQuery: string,
) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/${articleLanguage}/search/${articleQuery}`,
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

export const searchArticlesDashboardByLangAction = async (
  articleLanguage: LanguageTypeData,
  articleQuery: string,
) => {
  const [res, err] = await http<ArticleDataProps[]>("GET", {
    url: `/article/${articleLanguage}/search/dashboard/${articleQuery}`,
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
