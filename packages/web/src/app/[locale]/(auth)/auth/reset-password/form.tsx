"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import {
  FormControl,
  FormLabel,
  Input,
  RequiredIndicator,
  FormErrorMessage,
} from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { toast } from "@/components/UI/Toast"

import {
  sendResetPasswordAction,
  validityTokenAction,
} from "@/lib/api/server/user"
import { Icon } from "@/components/UI/Icon"

interface FormValues {
  password: string
}

export const ResetPasswordForm: React.FunctionComponent = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [onLoad, setOnLoad] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)

  React.useEffect(() => {
    CheckToken()
    // eslint-disable-next-line
  }, [])

  async function CheckToken() {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get("token") as string

    if (!token) {
      setErrorMessage("Token is required")
      setOnLoad(false)
      setShowForm(false)
      return
    }

    const { error } = await validityTokenAction({ token })
    if (error) {
      setErrorMessage(error)
      setOnLoad(false)
      setShowForm(false)
      return
    }

    setErrorMessage("")
    setOnLoad(false)
    setShowForm(true)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get("token") as string
    const { data, error } = await sendResetPasswordAction({
      token,
      password: values.password,
    })
    if (data) {
      toast({
        variant: "success",
        description: "Password sucessfully reseted",
      })
      router.push("/auth/login")
    } else {
      toast({ variant: "danger", description: error })
    }

    setLoading(false)
  }

  return (
    <>
      {errorMessage ? (
        <div className="my-12">
          <div
            className="my-8 flex rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <Icon.Alert className="mr-3 inline h-5 w-5 flex-shrink-0"></Icon.Alert>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">{errorMessage}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
            <Button type="submit" loading={loading} className="!mt-6 w-full">
              Reset Password
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}

      {onLoad && (
        <center>
          <p className="my-12">Waiting for Authentication...</p>
        </center>
      )}
    </>
  )
}
