"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"

import { postSettingAction } from "@/lib/api/server/setting"

interface FormValues {
  siteTitle: string
  siteTagline: string
  siteDescription: string
  siteMetaTitle: string
  siteMetaDescription: string
  email: string
  supportEmail: string
  facebookUsername: string
  twitterUsername: string
  instagramUsername: string
  youtubeChannel: string
  pinterestUsername: string
}

interface SettingFormProps {
  settingsValue?: FormValues
}
export function SettingForm(props: SettingFormProps) {
  const { settingsValue } = props
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ defaultValues: settingsValue })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const keyValues = {
      key: "settings",
      value: JSON.stringify(values),
    }
    const { data } = await postSettingAction(keyValues)
    if (data) {
      const parsedData = JSON.parse(data.value)
      reset(parsedData)
      toast({ variant: "success", description: "Settings has been updated" })
    }
    setLoading(false)
  }

  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.siteTitle)}>
            <FormLabel>
              Site Title
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("siteTitle", {
                required: "Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Title"
            />
            {errors?.siteTitle && (
              <FormErrorMessage>{errors.siteTitle.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.siteTagline)}>
            <FormLabel>
              Site Tagline
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("siteTagline", {
                required: "Tagline is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Tagline Username"
            />
            {errors?.siteTagline && (
              <FormErrorMessage>{errors.siteTagline.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.siteDescription)}>
            <FormLabel>
              Site Description
              <RequiredIndicator />
            </FormLabel>
            <Textarea
              {...register("siteDescription", {
                required: "Description is Required",
              })}
              className="max-w-xl"
              placeholder="Description"
            />
            {errors?.siteDescription && (
              <FormErrorMessage>
                {errors.siteDescription.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.siteMetaTitle)}>
            <FormLabel>
              Site Meta Title
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("siteMetaTitle", {
                required: "Meta Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Title"
            />
            {errors?.siteMetaTitle && (
              <FormErrorMessage>
                {errors.siteMetaTitle.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.siteMetaDescription)}>
            <FormLabel>
              Site Meta Description
              <RequiredIndicator />
            </FormLabel>
            <Textarea
              {...register("siteMetaDescription", {
                required: "Meta Description is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Meta Description"
            />
            {errors?.siteMetaDescription && (
              <FormErrorMessage>
                {errors.siteMetaDescription.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.email)}>
            <FormLabel>
              Email
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email tidak valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Email"
            />
            {errors?.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.supportEmail)}>
            <FormLabel>
              Support Email
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("supportEmail", {
                required: "Support Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Support Email is not valid",
                },
              })}
              className="max-w-xl"
              placeholder="Enter Support Email"
            />
            {errors?.supportEmail && (
              <FormErrorMessage>{errors.supportEmail.message}</FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.facebookUsername)}>
            <FormLabel>
              Facebook Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("facebookUsername", {
                required: "Facebook username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Facebook Username"
            />
            {errors?.facebookUsername && (
              <FormErrorMessage>
                {errors.facebookUsername.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.twitterUsername)}>
            <FormLabel>
              Twitter Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("twitterUsername", {
                required: "Twitter username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Twitter Username"
            />
            {errors?.twitterUsername && (
              <FormErrorMessage>
                {errors.twitterUsername.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.instagramUsername)}>
            <FormLabel>
              Instagram Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("instagramUsername", {
                required: "Instagram username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Instagram Username"
            />
            {errors?.instagramUsername && (
              <FormErrorMessage>
                {errors.instagramUsername.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.pinterestUsername)}>
            <FormLabel>
              Pinterest Username
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("pinterestUsername", {
                required: "Pinterest username is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Pinterest Username"
            />
            {errors?.pinterestUsername && (
              <FormErrorMessage>
                {errors.pinterestUsername.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <FormControl invalid={Boolean(errors.youtubeChannel)}>
            <FormLabel>
              Youtube Channel
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("youtubeChannel", {
                required: "Youtube channel is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Youtube Channel"
            />
            {errors?.youtubeChannel && (
              <FormErrorMessage>
                {errors.youtubeChannel.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </form>
        <Button
          aria-label="Submit"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
