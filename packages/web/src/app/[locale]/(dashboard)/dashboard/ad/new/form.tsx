"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { Switch } from "@/components/UI/Switch"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { postAdAction } from "@/lib/api/server/ad"
import { AdPositionData, AdTypeData } from "@/lib/data-types"

interface FormValues {
  title: string
  content: string
  position: AdPositionData
  type: AdTypeData
  active: boolean
}

export const AddNewAdForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)

    const { data, error } = await postAdAction(values)

    if (data) {
      reset()
      toast({ variant: "success", description: "Ad Successfully created" })
    } else {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl invalid={Boolean(errors.title)}>
        <FormLabel>
          Title
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "Title is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Title"
        />
        {errors?.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.content)}>
        <FormLabel>Content</FormLabel>
        <Textarea
          {...register("content")}
          className="max-w-xl"
          placeholder="Enter Script"
        />
        {errors?.content && (
          <FormErrorMessage>{errors.content.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.position)}>
        <FormLabel>
          Position
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Position</SelectLabel>
                  <SelectItem value="HOME_BELOW_HEADER">
                    Home (Below Header)
                  </SelectItem>
                  <SelectItem value="TOPIC_BELOW_HEADER">
                    Topic (Below Header)
                  </SelectItem>
                  <SelectItem value="ARTICLE_BELOW_HEADER">
                    Article (Below Header)
                  </SelectItem>
                  <SelectItem value="DOWNLOAD_BELOW_HEADER">
                    Download (Below Header)
                  </SelectItem>
                  <SelectItem value="SINGLE_ARTICLE_ABOVE_CONTENT">
                    Single Article (Above Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_ARTICLE_INLINE_CONTENT">
                    Single Article (Inline Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_ARTICLE_BELOW_CONTENT">
                    Single Article (Below Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_ARTICLE_POP_UP">
                    Single Article (Pop Up)
                  </SelectItem>
                  <SelectItem value="SINGLE_DOWNLOAD_ABOVE_CONTENT">
                    Single Download (Above Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_DOWNLOAD_INLINE_CONTENT">
                    Single Download (Inline Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_DOWNLOAD_BELOW_CONTENT">
                    Single Download (Below Content)
                  </SelectItem>
                  <SelectItem value="SINGLE_DOWNLOAD_POP_UP">
                    Single Download (Pop Up)
                  </SelectItem>
                  <SelectItem value="DOWNLOADING_PAGE">
                    Download (Downloading Page)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.position && (
          <FormErrorMessage>{errors.position.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.type)}>
        <FormLabel>
          Type
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="PLAIN_AD">Plain Ad</SelectItem>
                  <SelectItem value="ADSENSE">Adsense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.type && (
          <FormErrorMessage>{errors.type.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.active)}>
        <FormLabel>Active</FormLabel>
        <Controller
          control={control}
          name="active"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </FormControl>
      <Button aria-label="Submit" type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  )
}
