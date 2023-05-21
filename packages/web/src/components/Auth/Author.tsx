"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { Skeleton } from "@/components/UI/Skeleton"
import useStore, { useAuthStore } from "@/store/auth"
import { axiosInstance } from "@/lib/http"
import { getUserByIdAction } from "@/lib/api/server/user"

export function AuthorRole({ children }: { children: React.ReactNode }) {
  const isAuthor = useStore(useAuthStore, (state) => state.isAuthor)

  const isAuthenticated = useStore(
    useAuthStore,
    (state) => state.isAuthenticated,
  )

  const login = useStore(useAuthStore, (state) => state.login)
  const logout = useStore(useAuthStore, (state) => state.logout)
  const stopLoading = useStore(useAuthStore, (state) => state.stopLoading)
  const isLoading = useStore(useAuthStore, (state) => state.isLoading)

  const auth = useStore(useAuthStore, (state) => state.auth)

  const checkAuth = React.useCallback(() => {
    const authData = JSON.parse(localStorage.getItem("authStore") as string)
    const userId = authData.state.auth.user?.id
    const token = authData.state.auth.accessToken
    if (!userId && !token) {
      isAuthenticated && logout && logout()
      if (stopLoading) {
        stopLoading()
      }

      return
    }

    const loadUser = async () => {
      const data = await getUserByIdAction(userId)

      if (data) {
        login &&
          login({
            user: data,
            accessToken: token + "",
          })
      } else {
        localStorage.removeItem("authStore")
      }
      stopLoading && stopLoading()
    }

    if (isAuthenticated === false) {
      loadUser()
    }

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`
  }, [auth?.accessToken, isAuthenticated, login, logout, stopLoading])

  React.useEffect(() => {
    checkAuth()
    if (typeof window !== "undefined") {
      window.addEventListener("focus", checkAuth)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", checkAuth)
      }
    }
  }, [checkAuth])

  React.useEffect(() => {
    if (isLoading === false) {
      if (isAuthor === false) {
        redirect("/")
      }
    }
  }, [isLoading, isAuthor])

  if (isLoading === false) {
    if (isAuthor) {
      return <>{children}</>
    }
  }

  return (
    <div className="flex flex-col justify-center space-y-2">
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  )
}
