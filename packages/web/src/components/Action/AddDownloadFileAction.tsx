"use client"
import * as React from "react"
import NextImage from "next/image"
import { useForm } from "react-hook-form"
import { useCurrentUser } from "@/hooks/use-current-user"

import { DownloadFileDataProps } from "@/lib/data-types"
import { postDownloadFileAction } from "@/lib/api/server/download-file"
import { toast } from "../UI/Toast"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "../UI/Form"
import { ModalSelectMedia } from "../Modal/ModalSelectMedia"
import { Textarea } from "../UI/Textarea"
import { Button } from "../UI/Button"
import { AddAuthorsAction } from "./AddAuthorsAction"

interface FormValues {
  title: string
  meta_title?: string
  meta_description?: string
  version: string
  downloadLink: string
  fileSize: string
  currency: string
  price: string
}

interface AddDownloadFileProps extends React.HTMLAttributes<HTMLDivElement> {
  updateDownloadFiles: (data: DownloadFileDataProps) => void
}

export const AddDownloadFileAction = React.forwardRef<
  HTMLDivElement,
  AddDownloadFileProps
>((props, ref) => {
  const { updateDownloadFiles } = props
  const { user } = useCurrentUser()
  const [authors, setAuthors] = React.useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  React.useEffect(() => {
    if (user) {
      setAuthors((prevAuthors) => [...prevAuthors, user.user.id])
      setSelectedAuthors((prevSelectedAuthors) => [
        ...prevSelectedAuthors,
        { id: user.user.id, name: user.user.name },
      ])
    }
  }, [user])
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
      downloadIds: [""],
      featuredImageId: selectedFeaturedImageId,
      authorIds: authors,
    }

    const { data, error } = await postDownloadFileAction(mergedValues)
    if (data) {
      updateDownloadFiles(data)
      setSelectedFeaturedImageUrl("")
      setSelectedFeaturedImageId("")
      toast({
        variant: "success",
        description: "Download File Successfully created",
      })
      reset()
    } else if (error) {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    setOpenModal(false)
  }

  return (
    <div className="flex-1 space-y-4" ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
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
          <AddAuthorsAction
            authors={authors}
            addAuthors={setAuthors}
            selectedAuthors={selectedAuthors}
            addSelectedAuthors={setSelectedAuthors}
          />
          <FormControl invalid={Boolean(errors.version)}>
            <FormLabel>
              Version <RequiredIndicator />
            </FormLabel>
            <Input
              {...register("version", {
                required: "Version is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Version"
            />
            {errors?.version && (
              <FormErrorMessage>{errors.version.message}</FormErrorMessage>
            )}
          </FormControl>
          <div>
            {selectedFeaturedImageUrl ? (
              <>
                <ModalSelectMedia
                  handleSelectUpdateMedia={handleUpdateMedia}
                  open={openModal}
                  setOpen={setOpenModal}
                  triggerContent={
                    <>
                      <FormLabel>Featured Image</FormLabel>
                      <div className="relative">
                        <NextImage
                          src={selectedFeaturedImageUrl}
                          className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                          fill
                          alt="Featured Image"
                          onClick={() => setOpenModal(true)}
                          sizes="(max-width: 768px) 30vw,
            (max-width: 1200px) 20vw,
            33vw"
                          quality={60}
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
          </div>

          <FormControl invalid={Boolean(errors.meta_title)}>
            <FormLabel>Meta Title</FormLabel>
            <Input
              type="text"
              {...register("meta_title")}
              className="max-w-xl"
              placeholder="Enter Meta Title (Optional)"
            />
            {errors?.meta_title && (
              <FormErrorMessage>{errors.meta_title.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.meta_description)}>
            <FormLabel>Meta Description</FormLabel>
            <Textarea
              {...register("meta_description")}
              className="max-w-xl"
              placeholder="Enter Meta Description (Optional)"
            />
            {errors?.meta_description && (
              <FormErrorMessage>
                {errors.meta_description.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.downloadLink)}>
            <FormLabel>
              Download Link <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              {...register("downloadLink", {
                required: "Download link is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Download Link"
            />
            {errors?.downloadLink && (
              <FormErrorMessage>{errors.downloadLink.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.price)}>
            <FormLabel>Price</FormLabel>
            <Input
              type="text"
              {...register("price")}
              className="max-w-xl"
              placeholder="Enter Price"
            />
            {errors?.price && (
              <FormErrorMessage>{errors.price.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.fileSize)}>
            <FormLabel>File Size</FormLabel>
            <Input
              type="text"
              {...register("fileSize")}
              className="max-w-xl"
              placeholder="Enter File Size"
            />
            {errors?.fileSize && (
              <FormErrorMessage>{errors.fileSize.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.currency)}>
            <FormLabel>Currency</FormLabel>
            <Input
              type="text"
              {...register("currency")}
              className="max-w-xl"
              placeholder="Enter Currency"
            />
            {errors?.currency && (
              <FormErrorMessage>{errors.currency.message}</FormErrorMessage>
            )}
          </FormControl>
        </div>

        <Button aria-label="Submit" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </div>
  )
})
