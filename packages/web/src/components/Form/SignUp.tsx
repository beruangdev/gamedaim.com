"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { HiEye, HiEyeOff } from "react-icons/hi"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  RequiredIndicator,
  FormErrorMessage,
} from "ui"

import { signUpUser } from "@/lib/user"

export const SignUpForm: React.FunctionComponent = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)
  const [loading, setLoading] = React.useState<boolean>(false)

  interface FormValues {
    email: string
    name: string
    username: string
    password: string
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = async (values: unknown) => {
    setLoading(true)
    const data = await signUpUser(values)
    if (data) {
      toast.success("Successfully signed up")
      setLoading(false)
      router.push("/auth/login")
    }
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
        <FormControl invalid={Boolean(errors.name)}>
          <FormLabel>
            Name
            <RequiredIndicator />
          </FormLabel>
          <Input
            type="name"
            {...register("name", {
              required: "Name is required",
              min: {
                value: 1,
                message: "Minimal name 1 characters",
              },
              max: {
                value: 64,
                message: "Maximum name 64 characters",
              },
            })}
            placeholder="Enter your name"
          />
          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl invalid={Boolean(errors.username)}>
          <FormLabel>
            Username
            <RequiredIndicator />
          </FormLabel>
          <Input
            {...register("username", {
              required: "Username is Required",
              pattern: {
                value: /^[a-z0-9]{3,16}$/i,
                message:
                  "Username should be 3-20 characters without spaces, symbol or any special characters.",
              },
              min: {
                value: 3,
                message: "Minimal username 3 characters",
              },
              max: {
                value: 20,
                message: "Maximum username 20 characters",
              },
            })}
            placeholder="Enter your username"
          />
          {errors?.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </FormControl>
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
                required: "Password Requird",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,64}$/i,
                  message:
                    "Password should be 8-64 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!",
                },
                min: {
                  value: 8,
                  message: "Minimal password 8 characters",
                },
                max: {
                  value: 64,
                  message: "Maximum password 64 characters",
                },
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
          Sign Up
        </Button>
      </div>
    </form>
  )
}
