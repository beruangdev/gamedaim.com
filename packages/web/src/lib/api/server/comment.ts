import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { http } from "@/lib/http"
import { CommentDataProps, ErrorResponse } from "@/lib/data-types"

export const getCommentsCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/comment/count",
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

export const getCommentsAction = async (articleId: string) => {
  const [res, err] = await http<CommentDataProps[]>("GET", {
    url: `/comment/article/${articleId}`,
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

export const postCommentAction = async (articleId: string, content: string) => {
  const [res, err] = await http<CommentDataProps>("POST", {
    url: "/comment",
    data: { articleId, content },
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

export const deleteCommentAction = async (commentId: string) => {
  const [res, err] = await http<CommentDataProps>("DELETE", {
    url: `/comment/${commentId}`,
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

export const getCommentByIdAction = async (commentId: string) => {
  const [res, err] = await http<CommentDataProps>("GET", {
    url: `/comment/${commentId}`,
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

export const getCommentsByArticleIdAction = async (articleId: string) => {
  const [res, err] = await http<CommentDataProps[]>("GET", {
    url: `/comment/article/${articleId}`,
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
