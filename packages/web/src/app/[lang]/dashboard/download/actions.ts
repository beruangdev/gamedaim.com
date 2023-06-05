import { toast } from "@/components/UI/Toast"

import { deleteDownloadAction } from "@/lib/api/server/download"

export const handleDeleteDownload = async (
  downloadId: string,
  updateDownload: () => void,
) => {
  const { data, error } = await deleteDownloadAction(downloadId)
  if (data) {
    toast({
      variant: "success",
      description: "Successfully delete download!",
    })
    updateDownload()
  } else if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  }
}
