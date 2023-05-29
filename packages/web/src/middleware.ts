import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n-config"

import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

import { adminOrAuthorRoutes, authRoutes, adminRoutes } from "@/route/routes"
import { findAuthPage } from "./utils/helper"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

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

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!_next|.*\\..*).*)"],
}
