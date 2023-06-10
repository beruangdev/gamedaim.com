"use client"

import * as React from "react"

import Cookies from "js-cookie"
import { UserDataProps } from "@/lib/data-types"
import { getUserByIdAction } from "@/lib/api/server/user"
import { axiosInstance } from "@/lib/http"

export const useCurrentUser = () => {
  const [user, setUser] = React.useState<
    | (UserDataProps & {
        accessToken: string
      })
    | null
  >(null)

  React.useEffect(() => {
    const currentUser = Cookies.get("currentUser")
    const userData = currentUser && JSON.parse(currentUser)

    if (currentUser) {
      setUser({ ...userData.user, ...userData.accessToken })
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.accessToken}`
    }
  }, [])

  const refetchUser = async (userId: string) => {
    const { data: userInfo, error } = await getUserByIdAction(userId)
    const currentUser = Cookies.get("currentUser")

    if (userInfo && currentUser) {
      const dataCurrentUser = JSON.parse(currentUser)
      const newUser = {
        ...userInfo,
        accessToken: dataCurrentUser.accessToken,
      }
      Cookies.set("currentUser", JSON.stringify(newUser))
      setUser(newUser)
    } else {
      console.log(error)
    }
  }

  return { user, refetchUser }
}
