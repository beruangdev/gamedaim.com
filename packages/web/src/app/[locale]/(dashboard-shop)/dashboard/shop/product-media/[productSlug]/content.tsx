"use client"

import * as React from "react"

import useSWR from "swr"
import { useForm } from "react-hook-form"

import { toast } from "@/components/UI/Toast"
import { FormControl, FormLabel } from "@/components/UI/Form"
import { ModalSelectMedia } from "@/components/Modal"
import { Image } from "@/components/Image"
import { Button } from "@/components/UI/Button"

import { fetcher } from "@/lib/http"
import { postSettingAction } from "@/lib/api/server/setting"
import { PriceListPostPaidProps, PriceListPrePaidProps } from "@/lib/data-types"
import { slugify } from "@/utils/helper"

interface UploadMediaDashboardProps {
  priceBySlug: PriceListPostPaidProps | PriceListPrePaidProps
}
export function UploadProductMediaDashboardContent(
  props: UploadMediaDashboardProps,
) {
  const { priceBySlug } = props

  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [activeMedia, setActiveMedia] = React.useState("")
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] =
    React.useState<string>("")
  const [selectedCoverUrl, setSelectedCoverUrl] = React.useState<string>("")
  const [selectedIconUrl, setSelectedIconUrl] = React.useState<string>("")
  const [selectedInfoIdUrl, setSelectedInfoIdUrl] = React.useState<string>("")
  const { handleSubmit } = useForm({ mode: "onBlur" })

  useSWR(`/setting/${slugify(priceBySlug?.brand as string)}-image`, fetcher, {
    onSuccess: (data) => {
      if (data) {
        const parsedData = JSON.parse(data.value)
        setSelectedThumbnailUrl(parsedData.thumbnailImage)
        setSelectedCoverUrl(parsedData.coverImage)
        setSelectedIconUrl(parsedData.iconImage)
        setSelectedInfoIdUrl(parsedData.infoIdImage)
      }
    },
    onError: (error) => {
      toast({ variant: "danger", description: error.message })
    },
  })

  const onSubmit = async () => {
    setLoading(true)
    if (
      !selectedThumbnailUrl ||
      !selectedCoverUrl ||
      !selectedIconUrl ||
      !selectedInfoIdUrl
    ) {
      toast({ variant: "danger", description: "Gambar harus diisi" })
    } else {
      const mergedValues = {
        product: priceBySlug?.brand,
        thumbnailImage: selectedThumbnailUrl,
        coverImage: selectedCoverUrl,
        iconImage: selectedIconUrl,
        infoIdImage: selectedInfoIdUrl,
      }
      const keyData = {
        key: `${slugify(priceBySlug?.brand)}-image`,
        value: JSON.stringify(mergedValues),
      }

      const { data } = await postSettingAction(keyData)
      console.log(data)

      if (data) {
        toast({ variant: "success", description: "Sukses" })
      }
    }

    setLoading(false)
  }

  const handleUpdateMedia = (data: { url: React.SetStateAction<string> }) => {
    if (activeMedia === "thumbnail") {
      setSelectedThumbnailUrl(data.url)
      setActiveMedia("")
    } else if (activeMedia === "cover") {
      setSelectedCoverUrl(data.url)
      setActiveMedia("")
    } else if (activeMedia === "icon") {
      setSelectedIconUrl(data.url)
      setActiveMedia("")
    } else if (activeMedia === "info-id") {
      setSelectedInfoIdUrl(data.url)
      setActiveMedia("")
    }

    setOpenModal(false)
  }
  return (
    <>
      <div className="mt-4 flex items-end justify-end">
        <div className="flex-1 space-y-4">
          <h1>{priceBySlug?.brand}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormControl>
              {selectedThumbnailUrl ? (
                <>
                  <FormLabel>Thumbail Image</FormLabel>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <div className="border-muted/30 relative mt-2 aspect-video h-[120px] cursor-pointer rounded-sm border-2">
                          <Image
                            src={selectedThumbnailUrl}
                            className="object-cover"
                            fill
                            alt="Featured Image"
                            onClick={() => {
                              setActiveMedia("thumbnail")
                              setOpenModal(true)
                            }}
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
                        <FormLabel>Thumbnail Image</FormLabel>
                        <div
                          onClick={() => {
                            setActiveMedia("thumbnail")
                            setOpenModal(true)
                          }}
                          className="bg-muted text-success relative mr-auto flex aspect-video h-[120px] items-center justify-center"
                        >
                          <p>Select Thumbnail Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
            </FormControl>
            <FormControl>
              {selectedCoverUrl ? (
                <>
                  <FormLabel>Cover Image</FormLabel>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <div className="border-muted/30 relative mt-2 aspect-video h-[120px] cursor-pointer rounded-sm border-2">
                          <Image
                            src={selectedCoverUrl}
                            className="object-cover"
                            fill
                            alt="Cover Image"
                            onClick={() => {
                              setActiveMedia("cover")
                              setOpenModal(true)
                            }}
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
                        <FormLabel>Cover</FormLabel>
                        <div
                          onClick={() => {
                            setActiveMedia("cover")
                            setOpenModal(true)
                          }}
                          className="bg-muted text-success relative mr-auto flex aspect-video h-[120px] items-center justify-center"
                        >
                          <p>Select Cover Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
            </FormControl>
            <FormControl>
              {selectedIconUrl ? (
                <>
                  <FormLabel>Icon Image</FormLabel>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <div className="border-muted/30 relative mt-2 aspect-video h-[120px] cursor-pointer rounded-sm border-2 ">
                          <Image
                            src={selectedIconUrl}
                            className="object-cover"
                            fill
                            alt="Icon Image"
                            onClick={() => {
                              setActiveMedia("icon")
                              setOpenModal(true)
                            }}
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
                        <FormLabel>Icon Image</FormLabel>
                        <div
                          onClick={() => {
                            setActiveMedia("icon")
                            setOpenModal(true)
                          }}
                          className="bg-muted text-success relative mr-auto flex aspect-video h-[120px] items-center justify-center"
                        >
                          <p>Select Icon Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
            </FormControl>
            <FormControl>
              {selectedInfoIdUrl ? (
                <>
                  <FormLabel>Info ID Image</FormLabel>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <div className="border-muted/30 relative mt-2 aspect-video h-[120px] cursor-pointer rounded-sm border-2 ">
                          <Image
                            src={selectedInfoIdUrl}
                            className="object-cover"
                            fill
                            alt="Info ID Image"
                            onClick={() => {
                              setActiveMedia("info-id")
                              setOpenModal(true)
                            }}
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
                        <FormLabel>Info ID Image</FormLabel>
                        <div
                          onClick={() => {
                            setActiveMedia("info-id")
                            setOpenModal(true)
                          }}
                          className="bg-muted text-success relative mr-auto flex aspect-video h-[120px] items-center justify-center"
                        >
                          <p>Select Info ID Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
            </FormControl>
            <div className="align-center flex justify-center">
              <Button aria-label="Submit" variant="info" loading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
