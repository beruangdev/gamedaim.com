"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import NextImage from "next/image"
import { toast } from "@/components/UI/Toast"
import useSWR from "swr"
import { MdAdd, MdOutlineSearch } from "react-icons/md"
import { Input } from "@/components/UI/Form"
import { Text } from "@/components/UI/typography"

import { MediaDataProps } from "@/lib/data-types"
import { deleteMedia, useInfiniteMedias } from "@/lib/medias"
import { fetcher } from "@/lib/http"
import { IconButton } from "@/components/UI/Button"

const InfiniteScrollMedia = dynamic(() =>
  import("@/components/InfiniteScroll").then((mod) => mod.InfiniteScrollMedia),
)
const DeleteMediaButton = dynamic(() =>
  import("@/components/Media").then((mod) => mod.DeleteMediaButton),
)

export default function MediaLibraryDashboard() {
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null)
  const { data: mediasCount } = useSWR("/media/count", fetcher)

  const totalPageMedias = mediasCount && Math.ceil(mediasCount / 10)
  const { medias, page, setPage, updateMedias } = useInfiniteMedias()

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const { data: searchResult, mutate } = useSWR(
    searchQuery ? `/media/search/${searchQuery}` : null,
    fetcher,
  )

  const handleDelete = async (mediaName: string) => {
    const data = await deleteMedia(mediaName)
    if (data) {
      mutate()
      toast({
        variant: "success",
        title: "Media deleted successfully",
      })
    }
  }

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink aria-label="Add New Media" href="/dashboard/media/new">
            <IconButton
              aria-label="Add New Media"
              icon={<MdAdd aria-label="Add New Media" />}
            >
              Add New
            </IconButton>
          </NextLink>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <Input.Group>
            <Input type="text" onChange={handleSearchOnChange} />
            <Input.RightElement className="w-2">
              <button
                aria-label="Search"
                type="submit"
                className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
              >
                <MdOutlineSearch aria-label="Search" />
              </button>
            </Input.RightElement>
          </Input.Group>
        </form>
      </div>
      {searchQuery && searchResult && searchResult.length > 0 ? (
        <>
          <div className="my-3">
            <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-5">
              {searchResult &&
                searchResult.map((media: MediaDataProps) => (
                  <div className="relative overflow-hidden rounded-[18px]">
                    <DeleteMediaButton
                      content={media.name}
                      deleteMedia={() => handleDelete(media.name)}
                    />
                    <NextLink
                      aria-label={media.name}
                      href={`/dashboard/media/${media.id}`}
                    >
                      <NextImage
                        key={media.id}
                        src={media.url}
                        alt={media.alt || media.name}
                        fill
                        sizes="(max-width: 768px) 30vw,
                            (max-width: 1200px) 20vw,
                            33vw"
                        className="loading-image border-theme-300 bg-theme-300 !relative aspect-[1/1] h-[500px] max-w-[unset] rounded-sm border-2 object-cover"
                        onLoadingComplete={(e) => {
                          e.classList.remove("loading-image")
                        }}
                        quality={60}
                      />
                    </NextLink>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        searchQuery && (
          <div className="my-48 flex items-center justify-center">
            <Text size="4xl" as="h3" className="text-center font-bold">
              Medias Not found
            </Text>
          </div>
        )
      )}
      {!searchQuery && medias && medias.length > 0 ? (
        <>
          <div className="my-3">
            {medias && (
              <InfiniteScrollMedia
                medias={medias}
                index={2}
                isLibrary={true}
                totalPage={totalPageMedias}
                page={page}
                setPage={setPage}
                updateMedia={updateMedias}
              />
            )}
          </div>
        </>
      ) : (
        !searchQuery && (
          <div className="my-48 flex items-center justify-center">
            <Text size="4xl" as="h3" className="text-center font-bold">
              Medias Not found
            </Text>
          </div>
        )
      )}
    </>
  )
}
