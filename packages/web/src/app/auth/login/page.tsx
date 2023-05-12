import * as React from "react"
import NextLink from "next/link"
import { Divider } from "ui"

import { LoginForm } from "@/components/Form"

export default function Login() {
  return (
    <>
      <h1 className="text-center text-2xl">Login</h1>
      <LoginForm />
      <Divider />
      <p className="mt-8 text-center">
        Need an account?&nbsp;
        <NextLink
          className="text-primary-500 hover:text-primary-700 dark:text-theme-400 dark:hover:text-theme-300 font-semibold"
          href="/auth/signup"
        >
          Create an account
        </NextLink>
      </p>
      {/* <p className="mt-8 text-center"> */}
      {/*   Forgot Password?&nbsp; */}
      {/*   <NextLink */}
      {/*     className="text-primary-500 hover:text-primary-700 font-semibold dark:text-theme-400 dark:hover:text-theme-300" */}
      {/*     href="/auth/forgot-password" */}
      {/*   > */}
      {/*     Reset here */}
      {/*   </NextLink> */}
      {/* </p> */}
    </>
  )
}
