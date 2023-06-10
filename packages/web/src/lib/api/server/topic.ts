import { AxiosError } from "axios"

import { http } from "@/lib/http"
import {
  TopicDataProps,
  TopicSitemapDataProps,
  ErrorResponse,
  LanguageTypeData,
  TopicTypeData,
} from "@/lib/data-types"

export const postTopicWithPrimaryAction = async (values: unknown) => {
  const [res, err] = await http<TopicDataProps>("POST", {
    url: `/topic/with-primary`,
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

export const postTopicAction = async (values: unknown) => {
  const [res, err] = await http<TopicDataProps>("POST", {
    url: `/topic`,
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

export const putTopicAction = async (topicId: string, values: unknown) => {
  const [res, err] = await http<TopicDataProps>("PUT", {
    url: `/topic/${topicId}`,
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

export const deleteTopicWithPrimaryAction = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("DELETE", {
    url: `/topic/with-primary/${topicId}`,
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

export const deleteTopicAction = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("DELETE", {
    url: `/topic/${topicId}`,
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

export const getTopicByIdAction = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/${topicId}`,
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

export const getTopicPrimaryByIdAction = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/primary/${topicId}`,
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

export const getTopicsByLangAction = async (
  topicLanguage: LanguageTypeData,
  topicPage = 1,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/page/${topicPage}`,
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

export const getTopicsDashboardByLangAction = async (
  topicLanguage: LanguageTypeData,
  topicPage = 1,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/dashboard/page/${topicPage}`,
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

export const getTopicsSitemapByLangAction = async (
  topicLanguage: LanguageTypeData,
  topicPage = 1,
) => {
  const [res, err] = await http<TopicSitemapDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/sitemap/page/${topicPage}`,
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

export const getTopicsByTypeAndLangAction = async (
  topicLanguage: LanguageTypeData,
  topicType: TopicTypeData,
  topicPage = 1,
) => {
  const [res, err] = await http<TopicSitemapDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/type/${topicType}/page/${topicPage}`,
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

export const getTopicArticlesBySlugAction = async (
  topicSlug: string,
  topicPage = 1,
) => {
  const [res, err] = await http<TopicSitemapDataProps[]>("GET", {
    url: `/topic/slug/${topicSlug}/articles/page/${topicPage}`,
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

export const getTopicsBySlugAction = async (topicSlug: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/slug/${topicSlug}`,
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

export const getTopicsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/count",
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

export const getTopicPrimariesCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/count/primary",
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

export const searchTopicsByLangAction = async (
  topicLanguage: LanguageTypeData,
  topicQuery: string,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/search/${topicQuery}`,
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

export const searchTopicsDashboardByLangAction = async (
  topicLanguage: LanguageTypeData,
  topicQuery: string,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/search/dashboard/${topicQuery}`,
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
export const searchTopicsByLangAndTopicTypeAction = async (
  topicLanguage: LanguageTypeData,
  topicQuery: string,
  topicType: string,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/type/${topicType}/search/${topicQuery}`,
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
