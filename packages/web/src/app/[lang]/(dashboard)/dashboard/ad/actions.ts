import { toast } from "@/components/UI/Toast"
import { deleteAdAction } from "@/lib/api/server/ad"

export const handleDeleteAd = async (adId: string, updateAd: () => void) => {
  const { data, error } = await deleteAdAction(adId)

  if (data) {
    toast({
      variant: "success",
      description: "Ad Deleted Successfully!",
    })
    updateAd()
  } else if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  }
}
