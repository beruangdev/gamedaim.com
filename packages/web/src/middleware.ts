import createIntlMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
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

  const defaultLocale = "id_ID"

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ["id_ID", "en_US"],
    defaultLocale,
    domains: [
      {
        domain: "global.localhost",
        defaultLocale: "en_US",
        // Optionally restrict the locales managed by this domain. If this
        // domain receives requests for another locale (e.g. us.example.com/fr),
        // then the middleware will redirect to a domain that supports it.
        locales: ["en_US"],
      },
    ],
  })
  const response = handleI18nRouting(request)

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale)

  return response
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!_next|.*\\..*).*)"],
}
