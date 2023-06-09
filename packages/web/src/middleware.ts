import createIntlMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import env from "env"
import { adminOrAuthorRoutes, authRoutes, adminRoutes } from "@/route/routes"
import { findAuthPage } from "./utils/helper"

export default async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value
  const dataUser = currentUser && JSON.parse(currentUser)
  const currentTime = new Date().getTime()
  const pathname = request.nextUrl.pathname

  if (
    findAuthPage(pathname, adminOrAuthorRoutes) &&
    (!dataUser ||
      currentTime > new Date(dataUser.expiration).getTime() ||
      dataUser.user.role.includes("USER") ||
      dataUser.user.role.includes("PRO_USER"))
  ) {
    request.cookies.delete("currentUser")
    const response = NextResponse.redirect(new URL("/auth/login", request.url))
    response.cookies.delete("currentUser")

    return response
  }

  if (
    findAuthPage(pathname, adminRoutes) &&
    (!dataUser ||
      currentTime > new Date(dataUser.expiration).getTime() ||
      dataUser.user.role.includes("USER") ||
      dataUser.user.role.includes("PRO_USER") ||
      dataUser.user.role.includes("AUTHOR"))
  ) {
    request.cookies.delete("currentUser")
    const response = NextResponse.redirect(new URL("/auth/login", request.url))
    response.cookies.delete("currentUser")
    return response
  }

  if (authRoutes.includes(pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  const defaultLocale = "id"

  const handleI18nRouting = createIntlMiddleware({
    locales: ["id", "en"],
    defaultLocale,
    domains: [
      {
        domain:
          env.NODE_ENV !== "development"
            ? `global.${env.DOMAIN}`
            : `global.localhost`,
        defaultLocale: "en",
        locales: ["en"],
      },
    ],
  })
  const response = handleI18nRouting(request)

  response.headers.set("x-default-locale", defaultLocale)

  return response
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
