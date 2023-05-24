"use client"
import * as React from "react"

import Cookies from "js-cookie"
import { UserDataProps } from "@/lib/data-types"
import { getUserByIdAction } from "@/lib/api/server/user"

export const useCurrentUser = () => {
  const [user, setUser] = React.useState<{
    user: UserDataProps
    accessToken: string
  } | null>(null)

  React.useEffect(() => {
    const currentUser = Cookies.get("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const refetchUser = async (userId: string) => {
    const userInfo = await getUserByIdAction(userId)
    const currentUser = Cookies.get("currentUser")

    if (userInfo && currentUser) {
      const dataCurrentUser = JSON.parse(currentUser)
      const newUser = {
        user: userInfo,
        accessToken: dataCurrentUser.accessToken,
      }
      Cookies.set("currentUser", JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  return { user, refetchUser }
}
