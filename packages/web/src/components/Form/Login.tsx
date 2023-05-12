"use client"

import * as React from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { Button, Input, Label } from "@dafunda-ui-test/react"

import { loginUser } from "@/lib/user"
import { useAuthStore } from "@/store/auth"

export const LoginForm: React.FunctionComponent = () => {
  const { login } = useAuthStore()

  const [showPassword, setShowPassword] = React.useState(false)
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
    const data = await loginUser(values)
    if (data) {
      login({ ...data })
      toast.success("Successfully signed in")
    }

    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Label>Email</Label>
        <Input
          onInvalid={Boolean(errors.email)}
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
        <FormControl invalid={Boolean(errors.password)}>
          <FormLabel>
            Password
            <RequiredIndicator />
          </FormLabel>
          <Input.Group>
            <Input
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
                  <HiEyeOff className="text-theme-500 hover:text-theme-600 cursor-pointer text-xl" />
                ) : (
                  <HiEye className="text-theme-500 hover:text-theme-600 cursor-pointer text-xl" />
                )}
              </div>
            </Input.RightElement>
          </Input.Group>
          {errors?.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" variant="solid" loading={loading}>
          Login
        </Button>
      </div>
    </form>
  )
}
