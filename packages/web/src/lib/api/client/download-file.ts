import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetDownloadFilesCount = () => {
  const { data, error } = useSWR("/download-file/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { downloadFilesCount: data }
}
