"use client"

import * as React from "react"

import { Button } from "@/components/UI/Button"
import { DownloadCard } from "@/components/Card"

import { DownloadDataProps, LanguageTypeData } from "@/lib/data-types"
import { getDownloadsByLangAction } from "@/lib/api/server/download"

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: DownloadDataProps[]
  index: number
  totalPage: number
  locale: LanguageTypeData
}

export const InfiniteScrollDownload = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>((props, ref) => {
  const { posts, totalPage, index, locale, ...rest } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<number>(index || 1)
  const [list, setList] = React.useState<DownloadDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && totalPage >= page) {
        const { data: downloads } = await getDownloadsByLangAction(locale, page)
        setList((list: DownloadDataProps[]) => [
          ...list,
          ...(downloads as DownloadDataProps[]),
        ])
        setPage((prev: number) => prev + 1)
      }
    },
    [locale, page, totalPage],
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
  }, [handleObserver, posts])

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
                type={download.type}
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
