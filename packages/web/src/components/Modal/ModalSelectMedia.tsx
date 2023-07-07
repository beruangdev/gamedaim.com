"use client"

import * as React from "react"
import NextImage from "next/image"
import useSWR from "swr"

import { Icon } from "@/components/UI/Icon"
import { InfiniteScrollMedia } from "@/components/InfiniteScroll"
import { MediaUpload } from "@/components/Media"
import { Modal } from "@/components/Modal"
import { Input } from "@/components/UI/Form"
import { toast } from "@/components/UI/Toast"
import { ScrollArea } from "@/components/UI/ScrollArea"

import { useInfiniteMedias } from "@/lib/api/client/media"
import { searchMediaAction } from "@/lib/api/server/media"
import { MediaDataProps } from "@/lib/data-types"
import { fetcher } from "@/lib/http"

interface ModalSelectMediaProps {
  handleSelectUpdateMedia: (media: MediaDataProps) => void
  open: boolean
  setOpen: (open: boolean) => void
  triggerContent: React.ReactNode
}

export const ModalSelectMedia: React.FunctionComponent<
  ModalSelectMediaProps
> = (props) => {
  const { handleSelectUpdateMedia, triggerContent, open, setOpen } = props
  const [resultMedias, setResultMedias] = React.useState<MediaDataProps[]>([])

  const [searched, setSearched] = React.useState<boolean>(false)
  const {
    medias: listMedias,
    page,
    setPage,
    updateMedias,
  } = useInfiniteMedias()

  const { data: mediasCount } = useSWR("/media/count", fetcher)

  const totalPageMedias = mediasCount && Math.ceil(mediasCount / 10)

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearched(true)

    if (e.target.value.length > 1) {
      const { data, error } = await searchMediaAction(e.target.value)
      if (data) {
        setResultMedias(data)
      } else {
        toast({ variant: "danger", description: error })
      }
    } else if (e.target.value.length < 1) {
      setResultMedias(listMedias as MediaDataProps[])
    }
  }

  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        trigger={triggerContent}
        title="Select Featured Image"
        content={
          <ScrollArea className="h-[65vh] max-lg:h-[80vh] md:w-[60vh]">
            <div className="px-4">
              <MediaUpload addLoadMedias={updateMedias} />
              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Input.Group>
                    <Input
                      onChange={handleSearchChange}
                      type="text"
                      placeholder="Search image"
                    />
                    <Input.RightElement className="w-2">
                      <div className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none">
                        <Icon.Search aria-label="Search" />
                      </div>
                    </Input.RightElement>
                  </Input.Group>
                </form>
              </div>
              <div className="my-3">
                {!searched && listMedias && (
                  <InfiniteScrollMedia
                    medias={listMedias}
                    index={2}
                    updateMedia={updateMedias}
                    totalPage={totalPageMedias}
                    page={page}
                    selectMedia={handleSelectUpdateMedia}
                    setPage={setPage}
                  />
                )}

                {searched && resultMedias.length > 0 ? (
                  <div className="mb-4 grid grid-cols-3 gap-3 lg:grid-cols-5">
                    {resultMedias.map((media: MediaDataProps) => {
                      return (
                        <NextImage
                          key={media.id}
                          src={media.url}
                          alt={media.alt || media.name}
                          fill
                          sizes="(max-width: 768px) 30vw,
                      (max-width: 1200px) 20vw,
                      33vw"
                          className="loading-image border-muted/30 bg-muted/30 !relative aspect-[1/1] h-[500px] max-w-[unset] cursor-pointer rounded-sm border-2 object-cover"
                          onLoadingComplete={(e) => {
                            e.classList.remove("loading-image")
                          }}
                          onClick={(e: { preventDefault: () => void }) => {
                            e.preventDefault()
                            handleSelectUpdateMedia(media)
                            setSearched(false)
                          }}
                          quality={60}
                        />
                      )
                    })}
                  </div>
                ) : (
                  searched && <p>Medias Not Found</p>
                )}
              </div>
            </div>
          </ScrollArea>
        }
      />
    </>
  )
}
