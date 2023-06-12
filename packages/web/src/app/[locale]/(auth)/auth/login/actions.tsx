"use server"

import { UserDataProps } from "@/lib/data-types"
import { cookies } from "next/headers"

export async function saveCookiesActions(data: {
  expiration: string
  accessToken: string
  user: UserDataProps
  message?: string | undefined
}) {
  cookies().set({
    name: "currentUser",
    value: JSON.stringify(data),

    path: "/", // For all paths
  })
}
