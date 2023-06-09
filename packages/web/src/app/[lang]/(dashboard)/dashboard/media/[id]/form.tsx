"use client"
import * as React from "react"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { toast } from "@/components/UI/Toast"
import { FormControl, FormErrorMessage, FormLabel } from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { Textarea } from "@/components/UI/Textarea"

import { getMediaByIdAction, putMediaAction } from "@/lib/api/server/media"
import { copyToClipboard } from "@/utils/helper"

interface FormValues {
  name: string
  description: string
}

interface SetMediaProps extends FormValues {
  id: string
  url: string
  alt: string
}

export function EditMediaDashboard(props: { mediaId: string }) {
  const { mediaId } = props

  const [loading, setLoading] = React.useState<boolean>(false)
  const [media, setMedia] = React.useState<SetMediaProps>({
    id: "",
    name: "",
    url: "",
    alt: "",
    description: "",
  })

  const router = useRouter()

  const loadMedia = async () => {
    const { data } = await getMediaByIdAction(mediaId as string)
    if (data) {
      setMedia({
        id: data.id,
        name: data.name,
        url: data.url,
        alt: data.alt,
        description: data.description,
      })
    }
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>()

  React.useEffect(() => {
    loadMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaId])

  React.useEffect(() => {
    reset(media)
  }, [media, reset])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const { data } = await putMediaAction(media.id, values)
    if (data) {
      toast({ variant: "success", description: "Media updated successfully" })
      router.push(`/dashboard/media`)
    }
    setLoading(false)
  }

  return (
    <>
      <>
        <div className="mt-4 flex flex-col space-x-8 md:flex-row md:justify-between">
          <div
            className="relative aspect-[4/4]
            h-[200px]"
          >
            <NextImage
              src={media.url}
              alt={media.alt}
              className="border-muted/30 relative rounded-sm border-2 object-cover"
              fill
              sizes="(max-width: 768px) 30vw,
                (max-width: 1200px) 20vw,
                33vw"
              quality={60}
            />
          </div>
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormLabel>Name</FormLabel>
              <div className="border-muted/30 bg-muted/50 invalid:border- focus:bg-background invalid:border-warning/50 invalid:ring-warning/60 relative inline-flex h-9 w-full min-w-0 max-w-xl appearance-none items-center rounded-md border px-3 text-base transition-colors duration-75 ease-out focus:outline-none focus:ring-2 dark:invalid:ring-offset-2">
                <p>{media.name}</p>
              </div>
              <FormLabel>URL</FormLabel>
              <div className="border-muted/30 bg-muted/50 invalid:border- focus:bg-background invalid:border-warning/50 invalid:ring-warning/60 relative inline-flex h-9 w-full min-w-0 max-w-xl appearance-none items-center justify-between rounded-md border px-3 text-base transition-colors duration-75 ease-out focus:outline-none focus:ring-2 dark:invalid:ring-offset-2">
                <p>{media.url}</p>
                <Button
                  aria-label="Copy Link"
                  className="text-left font-normal"
                  variant="ghost"
                  size={null}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    copyToClipboard(media.url)
                    toast({
                      variant: "success",
                      description: "Copied article permalink",
                    })
                  }}
                >
                  Copy Link
                </Button>
              </div>
              <FormControl invalid={Boolean(errors.description)}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} className="max-w-xl" />
                {errors?.description && (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button aria-label="Save" type="submit" loading={loading}>
                Save
              </Button>
            </form>
          </div>
        </div>
      </>
    </>
  )
}
