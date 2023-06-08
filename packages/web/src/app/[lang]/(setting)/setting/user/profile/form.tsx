"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import { Image } from "@/components/Image"
import { ModalSelectMedia } from "@/components/Modal"
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
import { getUserByIdAction, putUserAction } from "@/lib/api/server/user"
import { useCurrentUser } from "@/hooks/use-current-user"

interface FormValues {
  username: string
  name?: string
  email?: string
  about?: string
  phoneNumber?: string
}

export const EditUserForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectProfilePictureId, setSelectProfilePictureId] =
    React.useState<string>("")
  const [selectedProfilePictureUrl, setSelectedProfilePictureUrl] =
    React.useState<string>("")
  const [user, setUser] = React.useState<FormValues & { id: string }>({
    id: "",
    username: "",
    name: "",
    email: "",
    about: "",
    phoneNumber: "",
  })

  const { user: currentUser } = useCurrentUser()

  const loadUser = React.useCallback(async () => {
    const { data, error } = await getUserByIdAction(
      currentUser?.user.id as string,
    )
    if (data) {
      setUser({
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        about: data.about,
        phoneNumber: data.phoneNumber,
      })
      setSelectProfilePictureId(data.profilePicture?.id as string)
      setSelectedProfilePictureUrl(data.profilePicture?.url as string)
    } else if (error) {
      toast({ variant: "danger", description: error })
    }
  }, [currentUser?.user.id])

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectProfilePictureId(data.id as string)
    setSelectedProfilePictureUrl(data.url as string)
    setOpenModal(false)
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>()

  React.useEffect(() => {
    loadUser()
  }, [loadUser])

  React.useEffect(() => {
    reset(user)
  }, [reset, user])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      profilePictureId: selectProfilePictureId,
    }
    const { data, error } = await putUserAction(
      user.id,
      selectProfilePictureId ? mergedValues : values,
    )
    if (data) {
      toast({ variant: "success", description: "Update Proile Successfully!" })
    } else {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl invalid={Boolean(errors.username)}>
        <FormLabel>
          Username
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("username", {
            required: "Username is Required",
          })}
          className="max-w-xl"
        />
        {errors?.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.name)}>
        <FormLabel>
          Name
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("name", {
            required: "Name is Required",
          })}
          className="max-w-xl"
        />
        {errors?.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.email)}>
        <FormLabel>
          Email
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="email"
          {...register("email", {
            required: "Email is Required",
          })}
          className="max-w-xl"
        />
        {errors?.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.phoneNumber)}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="text"
          {...register("phoneNumber", {
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Number is Invalid",
            },
          })}
          className="max-w-xl"
        />
        {errors?.phoneNumber && (
          <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
        )}
      </FormControl>
      {selectedProfilePictureUrl ? (
        <>
          <FormLabel>ProfilePicturee</FormLabel>
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <>
                <div className="relative">
                  <Image
                    src={selectedProfilePictureUrl}
                    className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                    fill
                    alt="ProfilePicturee"
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
                <FormLabel>ProfilePicturee</FormLabel>
                <div className="bg-muted text-success relative m-auto flex aspect-video h-[150px] items-center justify-center">
                  <p>Select ProfilePicturee</p>
                </div>
              </>
            }
          />
        </>
      )}
      <FormControl invalid={Boolean(errors.about)}>
        <FormLabel>Description</FormLabel>
        <Textarea
          {...register("about")}
          className="max-w-xl"
          placeholder="Enter Description (Optional)"
        />
        {errors?.about && (
          <FormErrorMessage>{errors.about.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button aria-label="Submit" type="submit" loading={loading}>
        Save
      </Button>
    </form>
  )
}
