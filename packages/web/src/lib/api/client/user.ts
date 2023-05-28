import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"

export const useGetUsersCount = () => {
  const { data, error } = useSWR("/user/count", fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { usersCount: data }
}

export const useGetUsers = (page = 1) => {
  const { data, error, mutate } = useSWR(`/user/page/${page}`, fetcher)

  if (error) {
    console.log(error)
    toast({ variant: "danger", description: error.message })
  }

  return { users: data, updatedUsers: mutate }
}
