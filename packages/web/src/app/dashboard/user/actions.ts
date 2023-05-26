import { toast } from "@/components/UI/Toast"
import { deleteUserAction } from "@/lib/api/server/user"

export const handleDeleteUser = async (
  userId: string,
  updateUser: () => void,
) => {
  const { data, error } = await deleteUserAction(userId)
  if (data) {
    toast({
      variant: "success",
      description: "Successfully delete user!",
    })
    updateUser()
  } else if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  }
}
