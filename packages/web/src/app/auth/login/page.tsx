import * as React from "react"
import NextLink from "next/link"

import { Separator } from "@/components/UI/Separator"

import { LoginForm } from "./form"

export default function Login() {
  return (
    <>
      <div>
        <h1 className="text-center text-2xl">Login</h1>
        <LoginForm />
        <Separator />
        <p className="mt-8 text-center">
          Need an account?&nbsp;
          <NextLink className="font-semibold" href="/auth/signup">
            Create an account
          </NextLink>
        </p>
        {/* <p className="mt-8 text-center"> */}
        {/*   Forgot Password?&nbsp; */}
        {/*   <NextLink */}
        {/*     className="font-semibold" */}
        {/*     href="/auth/forgot-password" */}
        {/*   > */}
        {/*     Reset here */}
        {/*   </NextLink> */}
        {/* </p> */}
      </div>
    </>
  )
}
