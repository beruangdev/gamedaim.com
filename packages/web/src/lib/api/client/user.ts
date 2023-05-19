import useSWR from "swr"
import { toast } from "ui"

import { fetcher } from "@/lib/http"

export const useGetUsersCount = () => {
  const { data } = useSWR("/user/count", fetcher)
  return { usersCount: data }
}

export const useGetUsers = (page = 1) => {
  const { data, error, mutate } = useSWR(`/user/page/${page}`, fetcher)

  if (error) {
    toast({ variant: "danger", description: error.message })
    console.log(error)
  }

  return { users: data, updatedUsers: mutate }
}
