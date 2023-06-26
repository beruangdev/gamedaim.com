"use client"

import * as React from "react"

import { useForm } from "react-hook-form"

import useSWR from "swr"

import { toast } from "@/components/UI/Toast"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { DeleteMediaButton } from "@/components/Media"
import { Image } from "@/components/Image"
import { ModalSelectMedia } from "@/components/Modal"

import { BannerProps } from "@/lib/data-types"
import { fetcher } from "@/lib/http"
import { postSettingAction } from "@/lib/api/server/setting"

interface FormValues {
  margin: string
  emailShop: string
}

export function SettingShopContent() {
  const [selectedBannerNo, setSelectedBannerNo] = React.useState<number>(1)
  const [listBanner, setListBanner] = React.useState<BannerProps[]>([
    {
      index: 1,
      url: "",
      active: true,
    },
  ])
  const activeBanner = listBanner.filter((list) => list.active === true)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const { data: datasSettings } = useSWR("/setting/settingShop", fetcher, {
    revalidateOnFocus: false,
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    const mergedValues = {
      ...values,
      banners: activeBanner,
    }
    const keyValues = {
      key: "settingShop",
      value: JSON.stringify(mergedValues),
    }
    const { data } = await postSettingAction(keyValues)
    if (data) {
      const parsedData = JSON.parse(data.value)
      reset(parsedData)
      toast({
        variant: "success",
        description: "Settings successfully created",
      })
    }
  }
  React.useEffect(() => {
    if (datasSettings?.value) {
      const parsedData = JSON.parse(datasSettings?.value)
      const banners = parsedData?.banners
      reset(parsedData)
      if (Array.isArray(banners) && banners.length >= 1) {
        setListBanner(banners)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasSettings])

  const handleUpdateMedia = (data: { url: string }) => {
    const newBannerList = [...listBanner]
    newBannerList[selectedBannerNo - 1].url = data.url
    setListBanner(newBannerList)

    setOpenModal(false)
  }

  const handleNonActiveBanner = (index: number) => {
    const newBannerList = [...listBanner]
    newBannerList[index - 1].active = false
    setListBanner(newBannerList)
  }

  const handleAddBanner = () => {
    const newBannerList = [...listBanner]
    const newIndex = listBanner[listBanner.length - 1].index + 1
    newBannerList.push({ index: newIndex, url: "", active: true })

    setListBanner(newBannerList)
  }

  const onSubmitAll = () => {
    setLoading(true)
    handleSubmit(onSubmit)()
    setLoading(false)
  }

  return (
    <>
      <div className="mb-[100px] mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <FormControl invalid={Boolean(errors.margin)}>
              <FormLabel>
                Add Margin Percentage
                <RequiredIndicator />
              </FormLabel>
              <Input
                type="number"
                {...register("margin", {
                  required: "Margin is Required",
                })}
                className="max-w-xl"
                placeholder="10"
              />
              {errors.margin && (
                <FormErrorMessage>{errors.margin.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl invalid={Boolean(errors.emailShop)}>
              <FormLabel>
                Email
                <RequiredIndicator />
              </FormLabel>
              <Input
                type="text"
                {...register("emailShop", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email tidak valid",
                  },
                })}
                className="max-w-xl"
                placeholder="Enter Email"
              />
              {errors?.emailShop && (
                <FormErrorMessage>{errors.emailShop.message}</FormErrorMessage>
              )}
            </FormControl>
          </form>
          <div className="flex justify-between">
            <FormLabel>Banner</FormLabel>
            {activeBanner.length < 4 && (
              <Button
                aria-label="Add Banner"
                className=""
                onClick={handleAddBanner}
              >
                Add Banner
              </Button>
            )}
          </div>

          {listBanner && (
            <div className="flex flex-row flex-wrap gap-2 p-2">
              {activeBanner.map((list) => {
                return (
                  <div
                    key={list.url}
                    className="flex h-[150px] w-[250px] flex-col overflow-hidden rounded-[18px]"
                  >
                    {list.url.length > 0 ? (
                      <div className="relative h-full w-full">
                        <DeleteMediaButton
                          content={`Banner`}
                          deleteMedia={() => handleNonActiveBanner(list.index)}
                        />
                        <ModalSelectMedia
                          handleSelectUpdateMedia={handleUpdateMedia}
                          open={openModal}
                          setOpen={setOpenModal}
                          triggerContent={
                            <div className="relative h-[150px] w-[250px]">
                              <Image
                                src={list.url}
                                fill
                                alt=""
                                className="h-full w-full object-cover"
                                sizes="(max-width: 768px) 30vw,
                            (max-width: 1200px) 20vw,
                            33vw"
                                quality={60}
                              />
                            </div>
                          }
                        />
                      </div>
                    ) : (
                      <ModalSelectMedia
                        handleSelectUpdateMedia={handleUpdateMedia}
                        open={openModal}
                        setOpen={setOpenModal}
                        triggerContent={
                          <div className="px-4">
                            <h3>Featured Image</h3>
                            <p
                              className="border-1 text-primary border-border cursor-pointer rounded-md p-8 text-center"
                              onClick={() => {
                                setSelectedBannerNo(list.index)
                                setOpenModal(true)
                              }}
                            >
                              Select Featured Image
                            </p>
                          </div>
                        }
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <Button
            aria-label="Submit"
            onClick={onSubmitAll}
            variant="info"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}
