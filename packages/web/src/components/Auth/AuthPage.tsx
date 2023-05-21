"use client"
import * as React from "react"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/UI/Skeleton"

import useStore, { useAuthStore } from "@/store/auth"
import { axiosInstance } from "@/lib/http"
import { getUserByIdAction } from "@/lib/api/server/user"

export function AuthPage({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore(
    useAuthStore,
    (state) => state.isAuthenticated,
  )
  const isUser = useStore(useAuthStore, (state) => state.isUser)

  const login = useStore(useAuthStore, (state) => state.login)
  const logout = useStore(useAuthStore, (state) => state.logout)
  const [isLoading, setIsLoading] = React.useState(true)
  const auth = useStore(useAuthStore, (state) => state.auth)
  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    if (isLoading === false) {
      if (isAuthenticated) {
        if (isUser === false) {
          redirect("/dashboard")
        } else {
          redirect("/")
        }
      }
    }
  }, [isAuthenticated, isLoading, isUser])

  if (isLoading === false) {
    if (isAuthenticated === false) {
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
