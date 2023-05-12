import * as React from "react"
import NextLink from "next/link"
import { Divider } from "ui"

import { SignUpForm } from "@/components/Form"

export default function SignUp() {
  return (
    <>
      <h1 className="text-center text-2xl">Sign Up</h1>
      <SignUpForm />
      <Divider />
      <p className="mt-8 text-center">
        Already have account?&nbsp;
        <NextLink
          className="text-primary-500 hover:text-primary-700 dark:text-theme-400 dark:hover:text-theme-300 font-semibold"
          href="/auth/login"
        >
          Login here
        </NextLink>
      </p>
    </>
  )
}
