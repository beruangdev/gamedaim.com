"use client"
import { Button } from "@/components/UI/Button"
import { DropZone } from "@/components/UI/DropZone"
import { FormControl, FormErrorMessage } from "@/components/UI/Form"
import { toast } from "@/components/UI/Toast"
import { postMediaAction } from "@/lib/api/server/media"
import { resizeImage } from "@/utils/resize-image"
import * as React from "react"
import { useForm } from "react-hook-form"

interface FormValues {
  file: FileList
}

export function UploadMediaDashboard() {
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
    const { data } = await postMediaAction({ image })
    if (data) {
      reset()
      toast({ variant: "success", description: "Media Successfully uploaded" })
    }
    setLoading(false)
  }

  return (
    <>
      <>
        <div className="mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormControl invalid={Boolean(errors.file)}>
                <DropZone {...register("file")} />
                {errors?.file && (
                  <FormErrorMessage>{errors.file.message}</FormErrorMessage>
                )}
              </FormControl>
              {/* {loading && ( */}
              <div className="align-center flex justify-center">
                <Button aria-label="Submit" loading={loading}>
                  Submit
                </Button>
              </div>
              {/* )} */}
            </form>
          </div>
        </div>
      </>
    </>
  )
}
