"use client"
import * as React from "react"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Textarea } from "@/components/UI/Textarea"
import { Button } from "@/components/UI/Button"
import { ModalSelectMedia } from "@/components/Modal/ModalSelectMedia"
import { signUpUserAction } from "@/lib/api/server/user"

interface FormValues {
  username: string
  name: string
  email: string
  password: string
  phoneNumber?: string
  about?: string
  meta_title?: string
  meta_description?: string
}

export default function CreateUsersDashboard() {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState(false)
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
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      profilePictureId: selectedProfilePictureId,
    }
    const data = await signUpUserAction(
      selectedProfilePictureId ? mergedValues : values,
    )
    if (data) {
      reset()
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedProfilePictureId(data.id)
    setSelectedProfilePictureUrl(data.url)
    setOpenModal(false)
  }
  return (
    <>
      <>
        <div className="mb-[100px] mt-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
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
                  {/*FIX: not appear on mobile*/}
                  <Input.RightElement className="w-2">
                    <div
                      onClick={(e) => {
                        e.preventDefault()
                        handleToggleShowPassword()
                      }}
                      className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
                    >
                      {showPassword ? (
                        <MdOutlineVisibilityOff
                          aria-label="Hide Password"
                          className="text-theme-500 hover:text-theme-600 cursor-pointer text-xl"
                        />
                      ) : (
                        <MdOutlineVisibility
                          aria-label="Show Password"
                          className="text-theme-500 hover:text-theme-600 cursor-pointer text-xl"
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
                  <FormErrorMessage>
                    {errors.phoneNumber.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              {selectedProfilePictureId ? (
                <>
                  <FormLabel>Featured Image</FormLabel>
                  <NextImage
                    src={selectedProfilePictureUrl}
                    className="border-theme-300 !relative mt-2 max-h-[200px] max-w-[200px] cursor-pointer rounded-sm border-2 object-cover"
                    fill
                    alt="Featured Image"
                    onClick={() => setOpenModal(true)}
                    sizes="(max-width: 768px) 30vw,
                      (max-width: 1200px) 20vw,
                      33vw"
                    quality={60}
                  />
                </>
              ) : (
                <>
                  <FormLabel>Featured Image</FormLabel>
                  <p onClick={() => setOpenModal(true)}>
                    Select Featured Image
                  </p>
                </>
              )}
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
            <ModalSelectMedia
              handleSelectUpdateMedia={handleUpdateMedia}
              open={openModal}
              setOpen={setOpenModal}
            />
          </div>
        </div>
      </>
    </>
  )
}
