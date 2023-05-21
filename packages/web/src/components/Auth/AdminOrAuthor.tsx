"use client"
import * as React from "react"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/UI/Skeleton"

import useStore, { useAuthStore } from "@/store/auth"
import { axiosInstance } from "@/lib/http"
import { getUserByIdAction } from "@/lib/api/server/user"

export function AdminOrAuthorRole({ children }: { children: React.ReactNode }) {
  const isAdmin = useStore(useAuthStore, (state) => state.isAdmin)
  const isAuthor = useStore(useAuthStore, (state) => state.isAuthor)
  // const isAuthenticated = useStore(
  //   useAuthStore,
  //   (state) => state.isAuthenticated,
  // )

  // const login = useStore(useAuthStore, (state) => state.login)
  // const logout = useStore(useAuthStore, (state) => state.logout)
  const auth = useStore(useAuthStore, (state) => state.auth)

  React.useEffect(() => {
    if (auth && auth?.user?.role === "USER") {
      console.log(auth)

      redirect("/")
    }
  }, [auth])

  if (auth && auth?.user?.role !== "USER") {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col justify-center space-y-2">
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  )
}
