"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { FormControl, FormErrorMessage } from "@/components/UI/Form"
import { DropZone } from "@/components/UI/DropZone"
import { toast } from "@/components/UI/Toast"
import { postMediaAction } from "@/lib/api/server/media"
import { resizeImage } from "@/utils/resize-image"

interface FormValues {
  file: FileList
}

interface MediaUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  addLoadMedias: () => void
}

export const MediaUpload = React.forwardRef<HTMLDivElement, MediaUploadProps>(
  (props, ref) => {
    const { addLoadMedias, ...rest } = props
    const [showUploadForm, setShowUploadForm] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm<FormValues>()

    const onSubmit = async (values: FormValues) => {
      setLoading(true)
      const image = await resizeImage(values.file[0])
      const { data, error } = await postMediaAction({ image })
      if (data) {
        addLoadMedias()
        reset()
      } else {
        toast({ variant: "danger", description: error })
      }
      setLoading(false)
    }

    return (
      <div className="my-2 space-y-2" {...rest} ref={ref}>
        <Button
          aria-label="Add New Media"
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          Add New
        </Button>
        <div className={showUploadForm ? "flex" : "hidden"}>
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormControl invalid={Boolean(errors.file)}>
                <DropZone {...register("file")} />
                {errors?.file && (
                  <FormErrorMessage>{errors.file.message}</FormErrorMessage>
                )}
              </FormControl>
              <div className="align-center flex justify-center">
                <Button aria-label="Submit" loading={loading}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  },
)
