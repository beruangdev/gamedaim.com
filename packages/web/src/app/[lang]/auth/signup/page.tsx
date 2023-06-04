import * as React from "react"
import NextLink from "next/link"
import { Metadata } from "next"

import { Separator } from "@/components/UI/Separator"

import { SignUpForm } from "./form"

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
}

export default function SignUp() {
  return (
    <>
      <h1 className="text-center text-2xl">Sign Up</h1>
      <SignUpForm />
      <Separator />
      <p className="mt-8 text-center">
        Already have account?&nbsp;
        <NextLink className="font-semibold" href="/auth/login">
          Login here
        </NextLink>
      </p>
    </>
  )
}
