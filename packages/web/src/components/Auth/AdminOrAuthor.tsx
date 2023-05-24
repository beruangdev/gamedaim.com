"use client"
import * as React from "react"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/UI/Skeleton"

import useStore, { useAuthStore } from "@/store/auth"
import { axiosInstance } from "@/lib/http"

export function AdminOrAuthorRole({ children }: { children: React.ReactNode }) {
  const auth = useStore(useAuthStore, (state) => state.auth)
  console.log(auth)

  React.useEffect(() => {
    if (auth && auth?.user?.role === "USER") {
      console.log(auth)

      redirect("/")
    }
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.accessToken}`
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
