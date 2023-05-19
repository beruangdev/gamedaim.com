"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Separator } from "@/components/UI/Separator"
import { withAuth } from "@/components/Auth"

const LoginForm = dynamic(() => import("./form").then((mod) => mod.LoginForm))

function Login() {
  return (
    <>
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
    </>
  )
}

export default withAuth(Login, "auth")
