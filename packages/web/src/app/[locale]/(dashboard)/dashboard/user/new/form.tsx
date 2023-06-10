"use client"

import * as React from "react"
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
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { signUpUserAction } from "@/lib/api/server/user"
import { UserDataRole } from "@/lib/data-types"

interface FormValues {
  username: string
  name: string
  email: string
  password: string
  phoneNumber?: string
  about?: string
  meta_title?: string
  meta_description?: string
  role: UserDataRole
}

export const AddNewUserForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectedProfilePictureId, setSelectedProfilePictureId] =
    React.useState<string>("")
  const [selectedProfilePictureUrl, setSelectedProfilePictureUrl] =
    React.useState<string>("")

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      profilePictureId: selectedProfilePictureId,
    }
    const { data, error } = await signUpUserAction(
      selectedProfilePictureId ? mergedValues : values,
    )
    if (data) {
      setSelectedProfilePictureId("")
      setSelectedProfilePictureUrl("")
      reset()
      toast({ variant: "success", description: "Create user successfully" })
    } else {
      toast({ variant: "danger", description: error })
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedProfilePictureId(data.id)
    setSelectedProfilePictureUrl(data.url)
    toast({ variant: "success", description: "Image has been selected" })
    setOpenModal(false)
  }

  return (
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
      <FormControl invalid={Boolean(errors.password)}>
        <FormLabel>
          Password
          <RequiredIndicator />
        </FormLabel>
        <Input.Group className="max-w-xl">
          <Input
            className="max-w-xl pr-20"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Password Requird",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,64}$/i,
                message:
                  "Password should be 8-64 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!",
              },
              min: {
                value: 8,
                message: "Minimal password 8 characters",
              },
              max: {
                value: 64,
                message: "Maximum password 64 characters",
              },
            })}
          />

          <Input.RightElement>
            <div
              onClick={(e) => {
                e.preventDefault()
                handleToggleShowPassword()
              }}
              className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
            >
              {showPassword ? (
                <Icon.VisibilityOff
                  aria-label="Hide Password"
                  className="text-muted/50 hover:text-muted/60 cursor-pointer text-xl"
                />
              ) : (
                <Icon.Visibility
                  aria-label="Show Password"
                  className="text-muted/50 hover:text-muted/60 cursor-pointer text-xl"
                />
              )}
            </div>
          </Input.RightElement>
        </Input.Group>
        {errors?.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
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
          <FormLabel>Profile Picture</FormLabel>
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <div className="relative">
                <Image
                  src={selectedProfilePictureUrl}
                  className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                  fill
                  alt="Profile Picture"
                  onClick={() => setOpenModal(true)}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                />
              </div>
            }
          />
        </>
      ) : (
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
  )
}
