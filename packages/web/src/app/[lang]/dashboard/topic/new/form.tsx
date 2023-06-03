"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Image } from "@/components/Image"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { Button } from "@/components/UI/Button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { ModalSelectMedia } from "@/components/Modal/ModalSelectMedia"
import { postTopicWithPrimaryAction } from "@/lib/api/server/topic"

interface FormValues {
  title: string
  description?: string
  metaTitle?: string
  metaDescription?: string
}

export const AddNewTopicForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectFeaturedImageId, setSelectFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [languageValue, setLanguageValue] = React.useState("")
  const [typeValue, setTypeValue] = React.useState("")

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      type: typeValue,
      featuredImageId: selectFeaturedImageId,
    }
    const { data, error } = await postTopicWithPrimaryAction(
      selectFeaturedImageId ? mergedValues : values,
    )
    if (data) {
      setSelectFeaturedImageId("")
      setSelectedFeaturedImageUrl("")
      reset()
      toast({ variant: "success", description: "Create topic successfully" })
    } else {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    toast({ variant: "success", description: "Image has been selected" })
    setOpenModal(false)
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
      <FormControl>
        <FormLabel>
          Language
          <RequiredIndicator />
        </FormLabel>
        <Select
          value={languageValue}
          onValueChange={(value) => setLanguageValue(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value="id_ID">Indonesia</SelectItem>
              <SelectItem value="en_US">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>
          Type
          <RequiredIndicator />
        </FormLabel>
        <Select
          value={typeValue}
          onValueChange={(value) => setTypeValue(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="ARTICLE">ARTICLE</SelectItem>
              <SelectItem value="REVIEW">REVIEW</SelectItem>
              <SelectItem value="TUTORIAL">TUTORIAL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormControl invalid={Boolean(errors.description)}>
        <FormLabel>Description</FormLabel>
        <Textarea
          {...register("description")}
          className="max-w-xl"
          placeholder="Enter Description (Optional)"
        />
        {errors?.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      {selectedFeaturedImageUrl ? (
        <>
          <FormLabel>Featured Image</FormLabel>
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <>
                <div className="relative">
                  <Image
                    src={selectedFeaturedImageUrl}
                    className="border-theme-300 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                    fill
                    alt="Featured Image"
                    onClick={() => setOpenModal(true)}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                  />
                </div>
              </>
            }
          />
        </>
      ) : (
        <>
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <>
                <FormLabel>Featured Image</FormLabel>
                <div className="bg-theme/90 text-success relative m-auto flex aspect-video h-[150px] items-center justify-center">
                  <p>Select Featured Image</p>
                </div>
              </>
            }
          />
        </>
      )}
      <FormControl invalid={Boolean(errors.metaTitle)}>
        <FormLabel>Meta Title</FormLabel>
        <Input
          type="text"
          {...register("metaTitle")}
          className="max-w-xl"
          placeholder="Enter Meta Title (Optional)"
        />
        {errors?.metaTitle && (
          <FormErrorMessage>{errors.metaTitle.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.metaDescription)}>
        <FormLabel>Meta Description</FormLabel>
        <Textarea
          {...register("metaDescription")}
          className="max-w-xl"
          placeholder="Enter Meta Description (Optional)"
        />
        {errors?.metaDescription && (
          <FormErrorMessage>{errors.metaDescription.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button aria-label="Submit" type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  )
}
