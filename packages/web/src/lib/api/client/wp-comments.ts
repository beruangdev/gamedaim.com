import useSWR from "swr"
import { AxiosError } from "axios"

import { fetcher, http } from "@/lib/http"
import { ErrorResponse, WpCommentDataProps } from "@/lib/data-types"
import { toast } from "@/components/UI/Toast"

export const FetchWpComment = ({
  addComment,
  setTotalComments,
  page,
  totalComments,
}: {
  addComment: (item: WpCommentDataProps[]) => void
  setTotalComments: (item: number) => void
  page: number
  totalComments: number
}): {
  data: WpCommentDataProps[]
  count: number
  lastPage: number
} => {
  const { data } = useSWR(`/wp-comment/page/${page}`, fetcher, {
    onSuccess: (data) => {
      addComment(data)
    },
    onError: (error) => {
      toast({
        variant: "danger",
        description: error.message,
      })
    },
  })

  const { data: count } = useSWR(`/wp-comment/count`, fetcher, {
    onSuccess: (data) => {
      setTotalComments(data)
    },
    onError: (error) => {
      toast({
        variant: "danger",
        description: error.message,
      })
    },
  })
  const lastPage = count && Math.ceil(totalComments / 10)

  return { data, count, lastPage }
}

export const getWpCommentsCount = async () => {
  try {
    const [res, err] = await http<number>("GET", {
      url: "/wp-comment/count",
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const getWpComments = async (articleId: string) => {
  try {
    const [res, err] = await http<WpCommentDataProps[]>("GET", {
      url: `/wp-comment/article/${articleId}`,
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const postWpComment = async (articleId: string, content: string) => {
  try {
    const [res, err] = await http<WpCommentDataProps>("POST", {
      url: "/wp-comment",
      data: { articleId, content },
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    } else {
      toast({
        variant: "success",
        description: "Komentar berhasil diposting",
      })
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const deleteWpComment = async ({ commentId }: { commentId: string }) => {
  try {
    const [res, err] = await http<WpCommentDataProps>("DELETE", {
      url: `/wp-comment/${commentId}`,
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    } else {
      toast({
        variant: "success",
        description: "Komentar berhasil dihapus",
      })
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const getWpCommentById = async (commentId: string) => {
  try {
    const [res, err] = await http<WpCommentDataProps>("GET", {
      url: `/wp-comment/${commentId}`,
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const getWpCommentsByArticleId = async (articleId: string) => {
  try {
    const [res, err] = await http<WpCommentDataProps[]>("GET", {
      url: `/wp-comment/article/${articleId}`,
    })

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(err)
    }

    return res
  } catch (error) {
    console.error(error)
  }
}

export const useGetWpCommentsCount = (): { commentsCount: number } => {
  const { data } = useSWR("/wp-comment/count", fetcher)
  return { commentsCount: data }
}
