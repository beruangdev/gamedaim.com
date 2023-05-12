import useSWR from "swr"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { http, fetcher } from "@/lib/http"
import {
  ErrorResponse,
  TopicDataProps,
  TopicTranslationDataProps,
} from "./data-types"

export const getTopicsCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/count",
  })

  if (err !== null) {
    console.log(err)
    toast.error(err.message)
    return
  }

  return res
}

export const getTopicTranslationsCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/topic/translation/count",
  })

  if (err !== null) {
    console.log(err)
    toast.error(err.message)
    return
  }

  return res
}

export const getTopics = async (
  topicPage = 1,
  topicLanguage: "id_ID" | "en_US",
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}page/${topicPage}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getTopicsDashboard = async (
  topicPage = 1,
  topicLanguage: "id_ID" | "en_US",
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/dashboard/page/${topicPage}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getTopicsSitemap = async (
  topicPage = 1,
  topicLanguage: "id_ID" | "en_US",
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}/sitemap/page/${topicPage}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

// export const getAllTopics = async () => {
//   const [res, err] = await http<TopicDataProps[]>("GET", {
//     url: "/topic/all",
//   })
//
//   if (err !== null) {
//     console.log(err)
//     toast.error(
//       (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
//     )
//     return
//   }
//
//   return res
// }

export const getTopicById = async (topicId: string) => {
  const [res, err] = await http<TopicDataProps>("GET", {
    url: `/topic/${topicId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getTopicTranslationById = async (topicTranslationId: string) => {
  const [res, err] = await http<TopicTranslationDataProps>("GET", {
    url: `/topic/translation/${topicTranslationId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getTopicTranslationBySlug = async (
  topicTranslationSlug: string,
) => {
  const [res, err] = await http<TopicTranslationDataProps>("GET", {
    url: `/topic/translation/slug/${topicTranslationSlug}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

// export const getTopicArticlesBySlug = async (
//   topicSlug: string,
//   topicPage: number,
// ) => {
//   const [res, err] = await http<TopicDataProps>("GET", {
//     url: `/topic/slug/${topicSlug}/articles/${topicPage}`,
//   })
//
//   if (err !== null) {
//     console.log(err)
//     toast.error(
//       (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
//     )
//     return
//   }
//
//   return res
// }

export const postTopic = async (value: unknown) => {
  const [res, err] = await http<TopicDataProps>("POST", {
    url: "/topic",
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const postTopicTransltion = async (value: unknown) => {
  const [res, err] = await http<TopicTranslationDataProps>("POST", {
    url: "/topic/translation",
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const putTopic = async (topicId: string, value: unknown) => {
  const [res, err] = await http<TopicDataProps>("PUT", {
    url: `/topic/${topicId}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const putTopicTranslation = async (
  topicTranslationId: string,
  value: unknown,
) => {
  const [res, err] = await http<TopicTranslationDataProps>("PUT", {
    url: `/topic/translation/${topicTranslationId}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const deleteTopic = async (topicId: unknown) => {
  const [res, err] = await http<TopicDataProps>("DELETE", {
    url: `/topic/${topicId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const deleteTopicTransaltion = async (topicTranslationId: unknown) => {
  const [res, err] = await http<TopicTranslationDataProps>("DELETE", {
    url: `/topic/translation/${topicTranslationId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const searchTopic = async (
  topicQuery: string,
  topicLanguage: "id_ID" | "en_US",
) => {
  const [res, err] = await http<TopicDataProps[]>("GET", {
    url: `/topic/${topicLanguage}search/${topicQuery}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const useGetTopicsCount = () => {
  const { data } = useSWR("/topic/count", fetcher)
  return { topicsCount: data }
}

export const useGetTopicTransltionsCount = () => {
  const { data } = useSWR("/topic/translation/count", fetcher)
  return { topicTranslationCount: data }
}
