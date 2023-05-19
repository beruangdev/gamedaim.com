"use server"

import { deleteUserAction } from "@/lib/api/server/user"

export const handleDeleteUser = async (userId: string) => {
  "use server"
  await deleteUserAction(userId)
}
