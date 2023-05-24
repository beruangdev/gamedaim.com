import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authRoutes, protectedRoutes } from "@/route/routes"

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value
  const dataUser = currentUser && JSON.parse(currentUser)

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!dataUser || dataUser.user.role.includes("USER"))
  ) {
    request.cookies.delete("currentUser")
    const response = NextResponse.redirect(new URL("/auth/login", request.url))
    response.cookies.delete("currentUser")

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}
