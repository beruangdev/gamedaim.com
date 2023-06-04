"use client"

import * as React from "react"
import NextImage from "next/image"
import NextLink from "next/link"

import { Button } from "@/components/UI/Button"
import { DeleteMediaButton } from "@/components/Media"
import { toast } from "@/components/UI/Toast"
import { MediaDataProps } from "@/lib/data-types"
import { deleteMediaAction } from "@/lib/api/server/media"

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  medias: MediaDataProps[][]
  index: number
  selectMedia?: (media: MediaDataProps) => void
  totalPage: number
  isLibrary?: boolean
  deleteMedia?: () => void
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  updateMedia: () => void
}

export const InfiniteScrollMedia = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>((props, ref) => {
  const {
    medias,
    totalPage,
    isLibrary,
    selectMedia,
    index,
    page,
    setPage,
    updateMedia,
    ...rest
  } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && totalPage >= page) {
        setPage(page + 1)
      }
    },
    [page, setPage, totalPage],
  )

  React.useEffect(() => {
    const lmRef: HTMLDivElement | null = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, index, isLibrary, medias, setPage])

  const handleDelete = async (media: MediaDataProps) => {
    const { data, error } = await deleteMediaAction(media.name)

    if (data) {
      updateMedia()
    } else {
      toast({ variant: "danger", description: error })
    }
  }

  return (
    <div ref={ref} {...rest}>
      <div className="mb-4 grid grid-cols-3 gap-3 lg:grid-cols-5">
        {isLibrary
          ? medias.map((list) =>
              list.map((media: MediaDataProps) => {
                return (
                  <div
                    key={media.name}
                    className="relative overflow-hidden rounded-[18px]"
                  >
                    <DeleteMediaButton
                      content={media.name}
                      deleteMedia={() => handleDelete(media)}
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
                )
              }),
            )
          : medias.map((list) =>
              list.map((media: MediaDataProps) => {
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
                    onClick={(
                      e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                    ) => {
                      e.preventDefault()
                      if (selectMedia) selectMedia(media)
                    }}
                  />
                )
              }),
            )}
      </div>
      <div ref={loadMoreRef}>
        <Button
          aria-label="No More Posts"
          loading={totalPage >= page}
          className="w-full cursor-default"
        >
          No More Posts
        </Button>
      </div>
    </div>
  )
})
