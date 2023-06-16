"use client"

import * as React from "react"

import { ArticleCardHorizontal } from "@/components/Card"
import { Button } from "@/components/UI/Button"

import { getArticlesByLangAction } from "@/lib/api/server/article"

import { ArticleDataProps, LanguageTypeData } from "@/lib/data-types"

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: ArticleDataProps[]
  pageType: string
  totalPage: number
  index?: number
  locale: LanguageTypeData
}

export const InfiniteScrollArticle = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>((props, ref) => {
  const { posts, pageType, totalPage, index = 1, locale, ...rest } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<number>(index)
  const [list, setList] = React.useState<ArticleDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async ([target]: IntersectionObserverEntry[]) => {
      if (target.isIntersecting && totalPage >= page) {
        const { data: articles } = await getArticlesByLangAction(locale, page)
        if (articles) {
          setList((prevList) => [
            ...prevList,
            ...(articles as ArticleDataProps[]),
          ])
          setPage((prevPage) => prevPage + 1)
        }
      }
    },
    [locale, page, totalPage],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)

    return () => {
      if (lmRef) observer.unobserve(lmRef)
    }
  }, [handleObserver, index, pageType, posts])

  return (
    <div ref={ref} {...rest}>
      {list.map((article: ArticleDataProps) => (
        <ArticleCardHorizontal article={article} />
      ))}
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
