import useSWR from "swr"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { fetcher, http } from "@/lib/http"
import { CommentDataProps, ErrorResponse } from "./data-types"

export const getCommentsCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/comment/count",
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

export const getComments = async (articleId: string) => {
  const [res, err] = await http<CommentDataProps[]>("GET", {
    url: `/comment/article/${articleId}`,
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

export const postComment = async (articleId: string, content: string) => {
  const [res, err] = await http<CommentDataProps>("POST", {
    url: "/comment",
    data: { articleId, content },
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

export const deleteComment = async (commentId: string) => {
  const [res, err] = await http<CommentDataProps>("DELETE", {
    url: `/comment/${commentId}`,
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

export const getCommentById = async (commentId: string) => {
  const [res, err] = await http<CommentDataProps>("GET", {
    url: `/comment/${commentId}`,
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

export const getCommentsByArticleId = async (articleId: string) => {
  const [res, err] = await http<CommentDataProps[]>("GET", {
    url: `/comment/article/${articleId}`,
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

export const useGetCommentsCount = (): { commentsCount: number } => {
  const { data } = useSWR("/comment/count", fetcher)
  return { commentsCount: data }
}
