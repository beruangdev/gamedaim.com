"use client"

import * as React from "react"

import { ArticleCardHorizontal } from "@/components/Card"
import { Button } from "@/components/UI/Button"
import { ArticleDataProps } from "@/lib/data-types"
import { getTopicArticlesBySlugAction } from "@/lib/api/server/topic"

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  posts: ArticleDataProps[]
  index?: number
  pageType: string
  totalPage: number
}

export const InfiniteScrollTopic = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>((props, ref) => {
  const { id, posts, pageType, totalPage, index = 1, ...rest } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<number>(index)
  const [list, setList] = React.useState<ArticleDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && totalPage >= page) {
        const { data: topic } = await getTopicArticlesBySlugAction(id, page)
        setList((list) => [...list, ...(topic?.articles as ArticleDataProps[])])
        setPage((prev: number) => prev + 1)
      }
    },
    [id, page, totalPage],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, pageType, posts])

  return (
    <div ref={ref} {...rest}>
      {list.map((article: ArticleDataProps) => {
        return <ArticleCardHorizontal key={article.id} article={article} />
      })}
      {totalPage >= page ? (
        <div ref={loadMoreRef}>
          <Button
            aria-label="Loading"
            loading
            className="w-full cursor-default"
          >
            Loading...
          </Button>
        </div>
      ) : (
        <div ref={loadMoreRef}>
          <Button
            aria-label="No More Posts"
            disabled
            className="w-full cursor-default"
          >
            No More Posts
          </Button>
        </div>
      )}
    </div>
  )
})
