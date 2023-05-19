"use client"

import * as React from "react"
import { redirect } from "next/navigation"

import { AdDataProps, SettingsSiteProps, UserDataProps } from "@/lib/data-types"
import { useAuthStore } from "@/store/auth"
import { getUserByIdAction } from "@/lib/api/server/user"
import { axiosInstance } from "@/lib/http"

export interface WithAuthProps {
  auth: UserDataProps
  settingsSite: SettingsSiteProps
  adsBelowHeader: AdDataProps[]
}

const HOME_ROUTE = "/"
const LOGIN_ROUTE = "/auth/login"

enum RouteRole {
  auth,
  optional,
  all,
  admin,
  author,
  adminOrAuthor,
}

export function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole,
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const {
      isAuthenticated,
      isAdmin,
      isAuthor,
      isLoading,
      isUser,
      login,
      logout,
      stopLoading,
      auth,
    } = useAuthStore()

    const checkAuth = React.useCallback(() => {
      const authData = JSON.parse(localStorage.getItem("authStore") as string)
      const userId = authData.state.auth.user?.id
      const token = authData.state.auth.accessToken
      if (!userId && !token) {
        isAuthenticated && logout()
        stopLoading()
        return
      }

      const loadUser = async () => {
        const data = await getUserByIdAction(userId)

        if (data) {
          login({
            user: data,
            accessToken: token + "",
          })
        } else {
          localStorage.removeItem("authStore")
        }
        stopLoading()
      }

      if (!isAuthenticated) {
        loadUser()
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.accessToken}`
    }, [auth.accessToken, isAuthenticated, login, logout, stopLoading])

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
    }, [isAuthenticated, isLoading, auth, isAdmin, isAuthor, isUser])

    if (isLoading) {
      return
    } else if (!isLoading) {
      if (
        !isAuthenticated &&
        routeRole !== "auth" &&
        routeRole !== "optional"
      ) {
        return
      } else if (
        isAuthor &&
        routeRole !== "adminOrAuthor" &&
        routeRole !== "author" &&
        routeRole !== "all" &&
        routeRole !== "optional" &&
        routeRole !== "auth"
      ) {
        return (
          <div className="text-foreground flex min-h-screen flex-col items-center justify-center">
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
          <div className="text-foreground flex min-h-screen flex-col items-center justify-center">
            <div>You not allowed access this page</div>
          </div>
        )
      }
    }

    return <Component {...(props as T)} auth={auth} />
  }

  return ComponentWithAuth
}
