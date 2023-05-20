"use client"

import * as React from "react"
import { redirect } from "next/navigation"

import { AdDataProps, SettingsSiteProps, UserDataProps } from "@/lib/data-types"
import useStore, { useAuthStore } from "@/store/auth"
import { getUserByIdAction } from "@/lib/api/server/user"
import { axiosInstance } from "@/lib/http"

export interface WithAuthProps {
  auth: UserDataProps
  settingsSite: SettingsSiteProps
  adsBelowHeader: AdDataProps[]
}

const HOME_ROUTE = "/"
const LOGIN_ROUTE = "/auth/login"

interface withAuthProps {
  routeRole: "auth" | "optional" | "all" | "admin" | "author" | "adminOrAuthor"
  children: React.ReactNode
}
export const WithAuth = (props: withAuthProps) => {
  const { routeRole, children } = props
  const isAuthenticated = useStore(
    useAuthStore,
    (state) => state.isAuthenticated,
  )
  const isAdmin = useStore(useAuthStore, (state) => state.isAdmin)

  const isAuthor = useStore(useAuthStore, (state) => state.isAuthor)
  const isLoading = useStore(useAuthStore, (state) => state.isLoading)
  const isUser = useStore(useAuthStore, (state) => state.isUser)
  const login = useStore(useAuthStore, (state) => state.login)
  const logout = useStore(useAuthStore, (state) => state.logout)
  const stopLoading = useStore(useAuthStore, (state) => state.stopLoading)
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

    if (!isAuthenticated) {
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
    if (!isLoading) {
      if (isAuthenticated) {
        if (routeRole === "auth") {
          if (!isUser) {
            redirect("/dashboard")
          } else {
            redirect(HOME_ROUTE)
          }
        } else if (routeRole === "adminOrAuthor") {
          if (isUser) {
            redirect(HOME_ROUTE)
          }
        } else if (routeRole === "admin") {
          if (!isAdmin) {
            redirect(HOME_ROUTE)
          }
        }
      } else {
        if (routeRole !== "auth" && routeRole !== "optional") {
          redirect(LOGIN_ROUTE)
        }
      }
    }
  }, [isAuthenticated, isLoading, auth, isAdmin, isAuthor, isUser, routeRole])

  if (isLoading) {
    return <>....</>
  } else if (isLoading === false) {
    if (
      isAuthenticated === false &&
      routeRole !== "auth" &&
      routeRole !== "optional"
    ) {
      return <>....</>
    } else if (
      isAuthor &&
      routeRole !== "adminOrAuthor" &&
      routeRole !== "author" &&
      routeRole !== "all" &&
      routeRole !== "optional" &&
      routeRole !== "auth"
    ) {
      return (
        <div>
          <div>You not allowed access this page</div>
        </div>
      )
    } else if (
      isUser &&
      routeRole !== "all" &&
      routeRole !== "optional" &&
      routeRole !== "auth"
    ) {
      return (
        <div>
          <div>You not allowed access this page</div>
        </div>
      )
    }
  }

  return <>{children}</>
}
