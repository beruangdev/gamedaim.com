"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"

import { useRouter } from "next/navigation"
import {
  FormControl,
  FormLabel,
  Input,
  RequiredIndicator,
  FormErrorMessage,
} from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { toast } from "@/components/UI/Toast"
import { loginUserAction } from "@/lib/api/server/user"
import { axiosInstance } from "@/lib/http"
import { getFacebookURL, getGoogleURL } from "@/utils/social-auth"

export const LoginForm: React.FunctionComponent = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)
  const [loading, setLoading] = React.useState<boolean>(false)

  interface FormValues {
    email: string
    password: string
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)

    const { data, error } = await loginUserAction(values)

    if (data) {
      const currentDate = new Date()
      const thirdDayDate = new Date(
        currentDate.getTime() + 2 * 24 * 60 * 60 * 1000,
      )
      const isoDate = thirdDayDate.toISOString()
      const dataCookies = { ...data, expiration: isoDate }
      Cookies.set("currentUser", JSON.stringify(dataCookies), {
        path: "/",
        domain: ".localhost",
      })

      toast({ variant: "success", description: "Successfully signed in" })

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`
      if (data.user.role.includes("USER")) {
        router.push("/")
      } else {
        router.push("/dashboard")
      }
    } else {
      toast({ variant: "danger", description: error })
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const url = getGoogleURL((location.href as string) || "/")
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }
  const handleFacebookLogin = async () => {
    const url = getFacebookURL((location.href as string) || "/")
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <FormControl invalid={Boolean(errors.email)}>
          <FormLabel>
            Email
            <RequiredIndicator />
          </FormLabel>
          <Input
            id="email-auth"
            type="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is Invalid",
              },
            })}
            placeholder="Enter your email"
          />
          {errors?.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl invalid={Boolean(errors.password)}>
          <FormLabel>
            Password
            <RequiredIndicator />
          </FormLabel>
          <Input.Group>
            <Input
              id="password-auth"
              className="pr-20"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is Required",
              })}
            />
            <Input.RightElement className="w-14">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  handleToggleShowPassword()
                }}
                className="absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
              >
                {showPassword ? (
                  <Icon.VisibilityOff className="text-foreground cursor-pointer text-xl" />
                ) : (
                  <Icon.Visibility className="text-foreground cursor-pointer text-xl" />
                )}
              </div>
            </Input.RightElement>
          </Input.Group>
          {errors?.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <div className="mt-6 w-full">
          <Button type="submit" loading={loading} className="w-full">
            Login
          </Button>
        </div>
        <div className="flex flex-col space-y-2 py-3">
          <Button
            disabled={true}
            loading={loading}
            onClick={handleGoogleLogin}
            type="button"
            variant="secondary"
            className="inline-flex border px-5 py-3 text-sm font-medium focus:outline-none focus:ring-4"
          >
            <Icon.Google className="-ml-1 mr-2 h-6 w-6" />
            Sign in with Google
          </Button>
          <Button
            disabled={true}
            loading={loading}
            type="button"
            onClick={handleFacebookLogin}
            variant="secondary"
            className="inline-flex border px-5 py-3 text-sm font-medium focus:outline-none focus:ring-4"
          >
            <Icon.Facebook className="text-primary -ml-1 mr-2 h-6 w-6" />
            Sign in with Facebook
          </Button>
        </div>
      </div>
    </form>
  )
}
