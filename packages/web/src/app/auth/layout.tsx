import * as React from "react"
import NextLink from "next/link"

import { Logo } from "@/components/Brand"
import { AuthPage } from "@/components/Auth"

export const metadata = {
  title: "Auth",
  description: "Auth",
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props
  return (
    <AuthPage>
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <NextLink className="my-24 flex items-center justify-center" href="/">
            <Logo />
          </NextLink>
          {children}
        </div>
      </div>
    </AuthPage>
  )
}
