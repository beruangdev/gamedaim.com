"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Image } from "@/components/Image"
import { ModalSelectMedia } from "@/components/Modal/ModalSelectMedia"
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
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { getTopicByIdAction, putTopicAction } from "@/lib/api/server/topic"

interface FormValues {
  title: string
  slug: string
  description?: string
  metaTitle?: string
  metaDescription?: string
}

export const EditTopicForm = (props: { id: string }) => {
  const { id } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectFeaturedImageId, setSelectFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [topic, setTopic] = React.useState<FormValues & { id: string }>({
    id: "",
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
  })
  const [languageValue, setLanguageValue] = React.useState<string>("")
  const [typeValue, setTypeValue] = React.useState<string>("")
  const router = useRouter()

  const loadTopic = React.useCallback(async () => {
    const { data, error } = await getTopicByIdAction(id as string)
    if (data) {
      setTopic({
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      })
      setLanguageValue(data.language)
      setTypeValue(data.type)
      setSelectFeaturedImageId(data.featuredImage?.id as string)
      setSelectedFeaturedImageUrl(data.featuredImage?.url as string)
    } else {
      toast({ variant: "danger", description: error })
    }
  }, [id])

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectFeaturedImageId(data.id as string)
    setSelectedFeaturedImageUrl(data.url as string)
    setOpenModal(false)
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>()

  React.useEffect(() => {
    loadTopic()
  }, [loadTopic])

  React.useEffect(() => {
    reset(topic)
  }, [reset, topic])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      featuredImageId: selectFeaturedImageId,
      type: typeValue,
    }
    const { data, error } = await putTopicAction(
      topic.id,
      selectFeaturedImageId ? mergedValues : values,
    )
    if (data) {
      router.push("/dashboard/topic")
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
      <FormControl invalid={Boolean(errors.slug)}>
        <FormLabel>
          Slug
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("slug", {
            required: "Slug is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Slug"
        />
        {errors?.slug && (
          <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
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
                    className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
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
                <div className="bg-muted text-success relative m-auto flex aspect-video h-[150px] items-center justify-center">
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
