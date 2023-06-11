"use client"

import * as React from "react"

import { DownloadCard } from "@/components/Card"
import { DownloadDataProps } from "@/lib/data-types"
import { getTopicDownloadsBySlugAction } from "@/lib/api/server/topic"
import { Button } from "../UI/Button"

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string
  posts: DownloadDataProps[]
  index: number
  totalPage: number
}

export const InfiniteScrollDownloadByTopic = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>((props, ref) => {
  const { slug, posts, totalPage, index, ...rest } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<number>(index)
  const [list, setList] = React.useState<DownloadDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && totalPage >= page) {
        const downloads = await getTopicDownloadsBySlugAction(slug, page)
        setList((prevList: DownloadDataProps[]) => [
          ...prevList,
          ...(downloads as unknown as DownloadDataProps[]),
        ])
        setPage((prevPage) => prevPage + 1)
      }
    },
    [slug, page, totalPage],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (lmRef) observer.observe(lmRef)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, loadMoreRef, posts])

  return (
    <div ref={ref} {...rest}>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list &&
          list.map((download) => {
            return (
              <DownloadCard
                operatingSystem={download.operatingSystem}
                slug={download.slug}
                title={download.title}
                type={"App"}
                downloadFiles={download.downloadFiles}
              />
            )
          })}
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
