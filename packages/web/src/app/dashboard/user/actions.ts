import { toast } from "@/components/UI/Toast"
import { deleteUserAction } from "@/lib/api/server/user"

export const handleDeleteUser = async (
  userId: string,
  updateUser: () => void,
) => {
  const { error } = await deleteUserAction(userId)
  if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  } else {
    updateUser()
  }
}
