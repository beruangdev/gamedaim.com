import useSWR from "swr"
import { fetcher, http } from "@/lib/http"
import { AxiosError } from "axios"
import { toast } from "@/components/UI/Toast"
import { CommentDataProps, ErrorResponse } from "@/lib/data-types"

export const FetchDownloadComment = ({
  addComment,
  setTotalComments,
  page,
  totalComments,
}: {
  addComment: (item: CommentDataProps[]) => void
  setTotalComments: (item: number) => void
  page: number
  totalComments: number
}): {
  data: CommentDataProps[]
  count: number
  lastPage: number
} => {
  const { data } = useSWR(`/download-comment/page/${page}`, fetcher, {
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

  const { data: count } = useSWR(`/download-comment/count`, fetcher, {
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
export const deleteDownloadComment = async ({
  commentId,
}: {
  commentId: string
}) => {
  try {
    const [res, err] = await http<CommentDataProps>("DELETE", {
      url: `/download-comment/${commentId}`,
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
      // Lakukan tindakan lain yang diperlukan setelah menghapus komentar
    }

    return res
  } catch (error) {
    console.error(error)
  }
}
