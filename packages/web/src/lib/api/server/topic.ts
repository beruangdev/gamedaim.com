import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { http } from "@/lib/http"
import { ErrorResponse, TopicDataProps } from "@/lib/data-types"

export const postTopicWithParentAction = async (value: unknown) => {
  const [res, err] = await http<TopicDataProps>("POST", {
    url: "/topic/with-paret",
    data: value,
  })

  if (err !== null) {
    console.log(err)
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

export const postTopicAction = async (value: unknown) => {
  const [res, err] = await http<TopicDataProps>("POST", {
    url: "/topic",
    data: value,
  })

  if (err !== null) {
    console.log(err)
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

export const putTopicAction = async (topicId: string, value: unknown) => {
  const [res, err] = await http<TopicDataProps>("PUT", {
    url: `/topic/${topicId}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)
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

export const deleteTopicWithParentAction = async (topicId: unknown) => {
  const [res, err] = await http<TopicDataProps>("DELETE", {
    url: `/topic/${topicId}`,
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

export const deleteTopicAction = async (topicId: unknown) => {
  const [res, err] = await http<TopicDataProps>("DELETE", {
    url: `/topic/${topicId}`,
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

export const getTopicParentByIdAction = async (topicParentId: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/parent/${topicParentId}`,
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

export const getTopicByIdAction = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/${topicId}`,
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

export const getTopicsAction = async (
  topicLanguage: "id_ID" | "en_US",
  topicPage = 1,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/page/${topicPage}`,
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

export const getTopicsDashboardAction = async (
  topicLanguage: "id_ID" | "en_US",
  topicPage = 1,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/dashboard/page/${topicPage}`,
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

export const getTopicsSitemapAction = async (
  topicLanguage: "id_ID" | "en_US",
  topicPage = 1,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/sitemap/page/${topicPage}`,
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

export const getTopicByTypeAction = async (
  topicLanguage: "id_ID" | "en_US",
  topicSlug: string,
) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/${topicLanguage}/type/${topicSlug}`,
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

export const getTopicArticlesBySlugAction = async (
  topicSlug: string,
  topicPage: number,
) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/slug/${topicSlug}/articles/${topicPage}`,
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

export const getTopicBySlugAction = async (topicSlug: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/slug/${topicSlug}`,
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

export const getTopicsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/count",
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

export const getTopicParentsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/count/parent",
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

export const searchTopicAction = async (
  topicLanguage: "id_ID" | "en_US",
  searchTopicQuery: string,
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/search/${searchTopicQuery}`,
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
