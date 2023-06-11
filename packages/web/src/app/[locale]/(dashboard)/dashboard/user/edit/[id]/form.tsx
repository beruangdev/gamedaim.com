"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

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
import { getUserByIdAction, putUserByAdminAction } from "@/lib/api/server/user"
import { UserDataRole } from "@/lib/data-types"

interface FormValues {
  username: string
  name: string
  email: string
  phoneNumber?: string
  about?: string
  meta_title?: string
  meta_description?: string
  role: UserDataRole
}

export const EditUserForm = (props: { id: string }) => {
  const { id } = props

  const router = useRouter()

  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectedProfilePictureId, setSelectedProfilePictureId] =
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
    role: "USER",
  })

  const loadUser = React.useCallback(async () => {
    const { data } = await getUserByIdAction(id as string)
    if (data) {
      setUser({
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        about: data.about,
        phoneNumber: data.phoneNumber,
        role: data.role,
      })

      setSelectedProfilePictureId(data.profilePicture?.id)
      setSelectedProfilePictureUrl(data.profilePicture?.url)
    }
  }, [id])

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedProfilePictureId(data.id)
    setSelectedProfilePictureUrl(data.url)
    setOpenModal(false)
  }

  const {
    register,
    formState: { errors },
    reset,
    control,
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
      profilePictureId: selectedProfilePictureId,
    }
    const { data, error } = await putUserByAdminAction(
      user.id,
      selectedProfilePictureId ? mergedValues : values,
    )

    if (data) {
      router.push("/dashboard/user")
    } else {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormControl invalid={Boolean(errors.email)}>
          <FormLabel>
            Email
            <RequiredIndicator />
          </FormLabel>
          <Input
            type="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is Invalid",
              },
            })}
            placeholder="Enter email"
            className="max-w-xl"
          />
          {errors?.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl invalid={Boolean(errors.name)}>
          <FormLabel>Name</FormLabel>
          <Input
            type="name"
            {...register("name", {
              required: "Name is required",
              min: { value: 1, message: "Minimal name 1 characters" },
              max: { value: 64, message: "Maximum name 64 characters" },
            })}
            placeholder="Enter name"
            className="max-w-xl"
          />
          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl invalid={Boolean(errors.username)}>
          <FormLabel>
            Username
            <RequiredIndicator />
          </FormLabel>
          <Input
            {...register("username", {
              required: "Username is Required",
              pattern: {
                value: /^[a-z0-9]{3,16}$/i,
                message:
                  "Username should be 3-20 characters without spaces, symbol or any special characters.",
              },
              min: {
                value: 3,
                message: "Minimal username 3 characters",
              },
              max: {
                value: 20,
                message: "Maximum username 20 characters",
              },
            })}
            placeholder="Enter your username"
            className="max-w-xl"
          />
          {errors?.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
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
            placeholder="Optional"
            className="max-w-xl"
          />
          {errors?.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
          )}
        </FormControl>

        {selectedProfilePictureUrl ? (
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
                      src={selectedProfilePictureUrl}
                      className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                      fill
                      alt="Featured Image"
                      onClick={() => setOpenModal(true)}
                      sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
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
                  <div
                    onClick={() => setOpenModal(true)}
                    className="bg-muted text-success relative m-auto flex aspect-video h-[150px] items-center justify-center"
                  >
                    <p>Select Featured Image</p>
                  </div>
                </>
              }
            />
          </>
        )}
        <FormControl invalid={Boolean(errors.role)}>
          <FormLabel>
            Role
            <RequiredIndicator />
          </FormLabel>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="AUTHOR">AUTHOR</SelectItem>
                    <SelectItem value="PRO_USER">PRO USER</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.role && (
            <FormErrorMessage>{errors.role.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl invalid={Boolean(errors.about)}>
          <FormLabel>About</FormLabel>
          <Textarea
            {...register("about")}
            className="max-w-xl"
            placeholder="Optional"
          />
          {errors?.about && (
            <FormErrorMessage>{errors.about.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button aria-label="Submit" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </>
  )
}
