"use client"

import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"

import { Button } from "@/components/UI/Button"
import { toast } from "@/components/UI/Toast"
import { Input } from "@/components/UI/Form"
import { DeleteMediaButton } from "@/components/Media"
import { InfiniteScrollMedia } from "@/components/InfiniteScroll"
import { Icon } from "@/components/UI/Icon"
import {
  useGetMediasCount,
  useInfiniteMedias,
  useSearchMedias,
} from "@/lib/api/client/media"
import { MediaDataProps } from "@/lib/data-types"
import { deleteMediaAction } from "@/lib/api/server/media"

export function MediaLibraryDashboard() {
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null)
  const { mediasCount } = useGetMediasCount()

  const totalPageMedias = mediasCount && Math.ceil(mediasCount / 10)
  const { medias, page, setPage, updateMedias } = useInfiniteMedias()

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const { resultsMedias, updateResultsMedias } = useSearchMedias(searchQuery)
  const handleDelete = async (mediaName: string) => {
    const { data } = await deleteMediaAction(mediaName)
    if (data) {
      updateResultsMedias()
      toast({
        variant: "success",
        description: "Media deleted successfully",
      })
    }
  }

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink aria-label="Add New Media" href="/dashboard/media/new">
            <Button aria-label="Add New Media">Add New </Button>
          </NextLink>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <Input.Group>
            <Input type="text" onChange={handleSearchOnChange} />
            <Input.RightElement>
              <Button variant={null}>
                <Icon.Search />
              </Button>
            </Input.RightElement>
          </Input.Group>
        </form>
      </div>
      {searchQuery && resultsMedias && resultsMedias.length > 0 ? (
        <>
          <div className="my-3">
            <div className="mb-4 grid grid-cols-3 gap-3 md:grid-cols-5">
              {resultsMedias &&
                resultsMedias.map((media: MediaDataProps) => (
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
                        className="loading-image border-muted/30 bg-muted/30 !relative aspect-[1/1] h-[500px] max-w-[unset] rounded-sm border-2 object-cover"
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
            <h2>Medias Not found</h2>
          </div>
        )
      )}
      {!searchQuery && medias && medias.length > 0 ? (
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
      ) : (
        !searchQuery && (
          <div className="my-48 flex items-center justify-center">
            <h2 className="text-center font-bold">Medias Not found</h2>
          </div>
        )
      )}
    </>
  )
}
