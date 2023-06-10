import * as React from "react"
import NextLink from "next/link"
import { Metadata } from "next"

import { Separator } from "@/components/UI/Separator"

import { ForgotPasswordForm } from "./form"
import { Icon } from "@/components/UI/Icon"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
}

export default function ForgotPassword() {
  return (
    <>
      <div>
        <h1 className="text-center text-2xl">Forgot Password</h1>
        <ForgotPasswordForm />
        <Separator className="my-4" />
        <p className="text-center">
          Need an account?&nbsp;
          <NextLink className="font-semibold" href="/auth/signup">
            Create an account
          </NextLink>
        </p>
        <p className="mt-8 text-center">
          <NextLink className="font-light" href="/auth/login">
            <Icon.ArrowLeft className="mr-2 inline-block h-5 w-5" /> Go to login
            page
          </NextLink>
        </p>
      </div>
    </>
  )
}
