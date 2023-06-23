"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import {
  FormControl,
  FormLabel,
  Input,
  RequiredIndicator,
  FormErrorMessage,
} from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { toast } from "@/components/UI/Toast"

import { sendVerificationTokenAction } from "@/lib/api/server/user"
import { Alert } from "@/components/UI/Alert"
import { Icon } from "@/components/UI/Icon"

export const ForgotPasswordForm: React.FunctionComponent = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isSend, setIsSend] = React.useState<boolean>(false)

  interface FormValues {
    email: string
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const { email } = values
    const { data, error } = await sendVerificationTokenAction(email)

    if (data) {
      toast({
        variant: "success",
        description: "Successfully send verification email",
      })

      setIsSend(true)
    } else {
      toast({ variant: "danger", description: error })
    }

    setLoading(false)
  }

  return (
    <>
      {isSend ? (
        <div className="my-12">
          <Alert className="my-12" variant="success">
            Email is send. You will receive an email message with instructions
            on how to reset your password.
          </Alert>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Alert className="my-12" variant="warning">
            <Icon.Alert className="mr-3 inline h-5 w-5 flex-shrink-0"></Icon.Alert>
            <div>
              <span className="font-medium">
                Please enter your email address. You will receive an email
                message with instructions on how to reset your password.
              </span>
            </div>
          </Alert>

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
            <Button type="submit" loading={loading} className="!mt-6 w-full">
              Get new Password
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
