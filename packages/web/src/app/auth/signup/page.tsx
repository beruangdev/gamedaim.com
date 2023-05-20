import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Separator } from "@/components/UI/Separator"
import { WithAuth } from "@/components/Auth"

const SignUpForm = dynamic(() => import("./form").then((mod) => mod.SignUpForm))

export default function SignUp() {
  return (
    <WithAuth routeRole="auth">
      <h1 className="text-center text-2xl">Sign Up</h1>
      <SignUpForm />
      <Separator />
      <p className="mt-8 text-center">
        Already have account?&nbsp;
        <NextLink className="font-semibold" href="/auth/login">
          Login here
        </NextLink>
      </p>
    </WithAuth>
  )
}
